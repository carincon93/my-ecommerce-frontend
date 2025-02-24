import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Loader from '@/components/icons/Loader'

import type { CartItem, Product, Stock } from '@/lib/types'
import { addCheckedCartToCookie, calculateTotal, cartCount, decryptCart, updateCartInCookie } from '@/stores/cartStore'
import { fetchProductData } from '@/services/productService'

import { Trash2, TriangleAlert } from 'lucide-react'

import Cookies from 'js-cookie'
import { PRODUCTS_FOLDER } from 'astro:env/client'
import { URL_BACKEND_UPLOADS } from 'astro:env/client'
import React, { useEffect, useRef, useState, type Dispatch } from 'react'
import CustomTooltip from './CustomTooltip'

interface CartItemProps<T> {
    cartItem: CartItem
    cartItems: CartItem[]
    classNameIdentifier?: string
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setItemsOutOfStockToFix: React.Dispatch<React.SetStateAction<number>>
    setData?: React.Dispatch<React.SetStateAction<T[]>>
    removeItemFromCart: (cartItem: CartItem) => void
}

const CartItem = <T,>({ cartItem, cartItems, classNameIdentifier, setCartItems, setLoading, setItemsOutOfStockToFix, setData, removeItemFromCart }: CartItemProps<T>) => {
    const [product, setProduct] = useState<Product>()
    const [stock, setStock] = useState<Stock>()
    const [qtyToBuy, setQtyToBuy] = useState<number>(0)
    const [isOutOfStock, setIsOutOfStock] = useState<boolean | 0>(false)
    const [isHovered, setIsHovered] = useState(false)

    const getProduct = async () => {
        const data = await fetchProductData(cartItem.id)
        setProduct(data)
    }

    const handleQtyChange = (value: string) => {
        const checkIfStockAvailable: boolean = stock?.quantity && Number(value) > stock?.quantity ? true : false
        setQtyToBuy(Number(value))
        setLoading(true)
        updateCartItem(value)
        setIsOutOfStock(checkIfStockAvailable)
        setItemsOutOfStockToFix((prev) => (checkIfStockAvailable ? prev + 1 : prev > 0 ? prev - 1 : 0))
    }

    const updateCartItem = (value: string) => {
        const valueNumber = Number(value)
        if (valueNumber === 0) {
            removeItemFromCart(cartItem)

            return
        }

        const newCartItem: CartItem = {
            id: product?.id ?? '',
            name: product?.name ?? '',
            slug: product?.slug ?? '',
            price: product?.price ?? 0,
            image: product?.photos && product?.photos.length > 0 ? product?.photos[0].image : '',
            quantity: valueNumber,
            stock: product?.stock?.find((item) => item.sku === cartItem?.stock.sku) as Stock,
        }

        const oldItemCartToRemove = cartItems.filter((item) => item.stock?.sku !== cartItem.stock?.sku)

        const cartItemsUpdated = [...oldItemCartToRemove, newCartItem]

        const sortedCartItemsUpdated = [...cartItemsUpdated].sort((a, b) => a.stock.sku.localeCompare(b.stock.sku))

        setTimeout(() => {
            setCartItems(sortedCartItemsUpdated)
        }, 1000)
    }

    const handleRemoveItemFromCart = (cartItem: CartItem) => {
        setItemsOutOfStockToFix((prev) => prev - 1)

        removeItemFromCart(cartItem)

        if (cartItems.length - 1 === 0 && setData) {
            setData([])
        }
    }

    useEffect(() => {
        if (product) {
            const getStock = product?.stock?.find((stock: Stock) => stock.sku === cartItem.stock.sku)

            setStock(getStock)
            setQtyToBuy(cartItem.quantity)
        }
    }, [product])

    useEffect(() => {
        if (!stock) {
            return
        }

        const checkIfStockAvailable = stock.quantity && cartItem.quantity > stock.quantity
        setIsOutOfStock(checkIfStockAvailable)

        if (checkIfStockAvailable) {
            setItemsOutOfStockToFix((prev) => prev + 1)
        }
    }, [stock, cartItem])

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <TableCell
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <div className="[.cart-page_&]:lg:w-[500px] font-medium flex flex-col lg:[.cart-page_&]:flex-row lg:[.cart-page_&]:items-center pt-16 pb-10 lg:[.cart-page_&]:py-2 lg:[.cart-page_&]:space-x-4">
                    <picture
                        className="aspect-square size-32 order-2 lg:[.cart-page_&]:order-1"
                        style={{
                            ...(isHovered && { viewTransitionName: `products-${product?.slug}-box` }),
                        }}>
                        {product?.photos && (
                            <img
                                className="object-cover w-full h-full"
                                src={`${URL_BACKEND_UPLOADS + PRODUCTS_FOLDER + product?.photos[0].image}`}
                                alt=""
                                style={{
                                    ...(isHovered && { viewTransitionName: `products-${product?.slug}-image` }),
                                }}
                            />
                        )}
                    </picture>
                    <div className="order-1 lg:[.cart-page_&]:order-2 ml-0 flex lg:items-start justify-between w-[95%] flex-row lg:[.cart-page_&]:flex-col lg:[.cart-page_&]:relative lg:[.cart-page_&]:top-0 relative">
                        <a
                            href={`/products/${product?.slug}`}
                            className="uppercase flex-1 block absolute left-0 lg:left-0 lg:[.cart-page_&]:relative -top-12 lg:[.cart-page_&]:top-0 w-[320%] lg:[.cart-page_&]:w-full max-lg:truncate overflow-hidden"
                            style={{
                                ...(isHovered && { viewTransitionName: `products-${product?.slug}-title` }),
                            }}>
                            {product?.name}
                        </a>

                        <small className="uppercase absolute -top-7 left-0 lg:[.cart-page_&]:top-0 lg:left-0 lg:relative">
                            <strong>Talla:</strong> {cartItem.stock?.size}
                        </small>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex flex-col lg:[.cart-page_&]:flex-row items-center lg:[.cart-page_&]:space-x-2 space-y-2 lg:[.cart-page_&]:space-y-0 relative -top-3 lg:top-0">
                    <div className="lg:[.cart-page_&]:flex-[0_0_80px] min-w-[57px]">
                        {stock && stock?.quantity > 0 && (
                            <Select
                                value={isOutOfStock ? undefined : qtyToBuy?.toString()}
                                onValueChange={handleQtyChange}>
                                <SelectTrigger className={`w-full flex-1 bg-white text-black border ${isOutOfStock ? 'border-red-300 text-red-400' : ''} `}>
                                    <SelectValue placeholder={isOutOfStock ? cartItem.quantity.toString() : ''} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Array.from({ length: stock?.quantity || 0 }, (_, index) => (
                                            <SelectItem
                                                key={index + 1}
                                                value={(index + 1).toString()}>
                                                {index + 1}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                    <Button
                        onClick={() => handleRemoveItemFromCart(cartItem)}
                        variant="outline"
                        className="uppercase w-[57px] bg-white">
                        <Trash2 color="red" />
                    </Button>
                    {Boolean(isOutOfStock) && (
                        <div className={`group ${classNameIdentifier}`}>
                            <CustomTooltip
                                tooltipTrigger={
                                    <Button className="bg-red-500 w-[57px]">
                                        <TriangleAlert />
                                    </Button>
                                }
                                contentBackground="bg-red-500">
                                <p>
                                    Has seleccionado {cartItem.quantity} ítems, pero el stock disponible es insuficiente. <br />
                                    Por favor, elije una cantidad menor.
                                </p>
                            </CustomTooltip>
                        </div>
                    )}
                </div>
            </TableCell>
            <TableCell
                className="text-right"
                width="w-1/3">
                ${((product?.price ?? 0) * (qtyToBuy ?? 0)).toLocaleString('es-CO')},00
            </TableCell>
        </>
    )
}

interface CartProps<T> {
    classNameIdentifier?: string
    setData?: React.Dispatch<React.SetStateAction<T[]>>
}

export default function Cart<T>({ classNameIdentifier, setData }: CartProps<T>) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [urlCookie, setUrlCookie] = useState<string | undefined>('')
    const [totalPrice, setTotalPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const [isCopiedToClipboard, setIsCopiedToClipboard] = useState(false)
    const [itemsOutOfStockToFix, setItemsOutOfStockToFix] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    // Eliminar un ítem del carrito
    const removeItemFromCart = (cartItem: CartItem) => {
        if (cartItems.length === 1) {
            Cookies.set('cart', '', { expires: 7 })
        }

        setCartItems((prev) => prev.filter((item) => item.stock?.sku !== cartItem.stock?.sku))
    }

    const copyToClipboard = () => {
        if (inputRef.current) {
            const valueToCopy = inputRef.current.value
            setIsCopiedToClipboard(true)
            setTimeout(() => {
                setIsCopiedToClipboard(false)
            }, 4000)
            navigator.clipboard
                .writeText(valueToCopy)
                .then(() => {
                    console.log('Texto copiado al portapapeles:', valueToCopy)
                })
                .catch((error) => {
                    console.error('Error al copiar al portapapeles:', error)
                })
        }
    }

    useEffect(() => {
        if (cartItems.length > 0) {
            // Recalcular el total si cambia cartItems
            const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
            setTotalPrice(total)

            const sortedCartItems = sortItems(cartItems)
            updateCartInCookie(sortedCartItems)

            if (setData && sortedCartItems.every((item) => item instanceof Object)) setData(sortedCartItems as unknown as T[])
        }
        setLoading(false)
        cartCount.set(cartItems.length)
    }, [cartItems]) // Escucha cambios en cartItems

    useEffect(() => {
        addCheckedCartToCookie(itemsOutOfStockToFix <= 0)
    }, [itemsOutOfStockToFix])

    useEffect(() => {
        setLoading(false)
        const cookie = Cookies.get('cart')
        if (cookie) {
            const decryptedItems = decryptCart(cookie)
            const sortedDecryptedItems = sortItems(decryptedItems)
            setCartItems(sortedDecryptedItems)
        }
    }, [])

    const sortItems = (cartItems: CartItem[]) => {
        return [...cartItems].sort((a, b) => a.stock.sku.localeCompare(b.stock.sku))
    }

    return (
        <>
            {cartItems.length > 0 ? (
                <div className={`group ${classNameIdentifier}`}>
                    <h2 className="font-bold pl-2 text-2xl mb-4 uppercase hidden [.cart-page_&]:block">Mi carrito de compras</h2>
                    {/* <CustomDialog
                        triggerText="Compartir mi carrito"
                        dialogTitle="Compartir mi carrito"
                        dialogDescription="Genera y comparte un enlace único para que otros accedan fácilmente a tu carrito y finalicen la compra. ¡Rápido y práctico!">
                        <picture>
                            <img
                                src="/CompartirCarrito.webp"
                                className="mx-auto w-6/12"
                            />
                        </picture>
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label
                                    htmlFor="link"
                                    className="sr-only">
                                    Link
                                </Label>
                                <Input
                                    id="link"
                                    defaultValue={`${URL}/cart?cartId=${urlCookie?.replace(/\+/g, '%20')}`}
                                    ref={inputRef}
                                    onFocus={copyToClipboard}
                                    readOnly
                                />
                            </div>
                            <Button
                                type="submit"
                                size="sm"
                                className={`px-3 ${isCopiedToClipboard ? 'bg-green-600' : ''}`}
                                onClick={copyToClipboard}>
                                <span className="sr-only">Copy</span>
                                {!isCopiedToClipboard ? <Copy /> : <Check />}
                            </Button>
                        </div>
                    </CustomDialog> */}

                    <div
                        className="[.cart-dialog_&]:h-[70dvh] overflow-y-auto"
                        style={{ scrollbarWidth: 'none' }}>
                        <Table className="[.cart-dialog_&]:table-fixed max-lg:table-fixed">
                            <TableHeader className='select-none'>
                                <TableRow>
                                    <TableHead className="uppercase text-xs">Producto</TableHead>
                                    <TableHead className="uppercase text-xs">Cantidad</TableHead>
                                    <TableHead className="uppercase text-xs text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cartItems.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        className="relative">
                                        <CartItem
                                            cartItem={item}
                                            cartItems={cartItems}
                                            setCartItems={setCartItems}
                                            setItemsOutOfStockToFix={setItemsOutOfStockToFix}
                                            setLoading={setLoading}
                                            removeItemFromCart={removeItemFromCart}
                                            classNameIdentifier={classNameIdentifier}
                                            setData={setData}
                                        />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="py-4 border-t border-y-gray-300 [.checkout-dialog_&]:hidden">
                        <div className="flex flex-col lg:[.cart-page_&]:flex-row items-center justify-between">
                            <div className="order-2 lg:[.cart-page_&]:order-1 my-3 lg:[.cart-page_&]:my-0">
                                <a
                                    href="/"
                                    className="underline pl-2 uppercase">
                                    Seguir comprando
                                </a>
                            </div>

                            <a
                                href={itemsOutOfStockToFix > 0 || totalPrice === 0 ? undefined : '/checkout#informacion'}
                                className={`uppercase ${
                                    itemsOutOfStockToFix <= 0 ? 'bg-black' : 'bg-red-500 opacity-60'
                                } w-full lg:[.cart-page_&]:w-min text-white order-1 lg:[.cart-page_&]:order-2 block shrink-0 flex-[0_0_25%] p-2 text-center rounded-md`}>
                                {loading ? <Loader className="text-orange-400" /> : `Pagar pedido • $${totalPrice.toLocaleString('es-CO')},00`}
                            </a>
                        </div>
                        <p className="text-xs text-center mt-0 lg:[.cart-page_&]:mt-10">Impuesto incluido. Los gastos de envío se calculan en la pantalla de pago.</p>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col space-y-4 items-center justify-center">
                    <h1 className="font-bold pl-2 text-5xl text-center">Tu carrito está vacío</h1>
                    <p className="text-center">¿No sabes qué comprar? ¡Mira tus próximos productos favoritos!</p>
                    <a
                        href="/"
                        className="block text-center mt-4 bg-black dark:bg-white dark:text-black text-white uppercase px-10 py-2 rounded-md mx-auto">
                        Seguir comprando
                    </a>
                </div>
            )}
        </>
    )
}
