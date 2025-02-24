import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import type { CartItem, Product, Stock } from '@/lib/types'
import { useEffect, useState } from 'react'
import { addToCart, cartCount, decryptCart, getTotalCartItemsFromCookie } from '@/stores/cartStore'
import Cookies from 'js-cookie'
import { PackageCheck, Ruler } from 'lucide-react'
import { URL_BACKEND_UPLOADS } from 'astro:env/client'
import CustomSheet from './CustomSheet'

interface ShoppingCartButtonProps {
    product: Product
    checkIfCartHasItems?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ShoppingCartButtons({ product, checkIfCartHasItems }: ShoppingCartButtonProps) {
    const [qtyBySize, setQtyBySize] = useState<number>(0)
    const [qtyToBuy, setQtyToBuy] = useState<number>(0)
    const [addingItemToCart, setAddingItemToCart] = useState<boolean>(false)
    const [stockSelected, setStockSelected] = useState<Stock>()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const cookie = Cookies.get('cart')

    const handleQtyChange = (value: string) => {
        setQtyToBuy(Number(value))
    }

    const handleStockSelected = (stock: Stock) => {
        if (stock.quantity > 0) {
            setStockSelected(stock)
            setQtyBySize(stock.quantity)
        }
    }

    // Función para agregar un producto al carrito
    const addItemToCart = () => {
        const productInCart = cartItems.find((item) => item.slug === product?.slug && item.stock?.size === stockSelected?.size)

        const item: CartItem = {
            id: product?.id ?? '',
            name: product?.name ?? '',
            slug: product?.slug ?? '',
            price: product?.price ?? 0,
            image: product?.photos && product?.photos.length > 0 ? product?.photos[0].image : '',
            quantity: (productInCart?.quantity ?? 0) + qtyToBuy,
            stock: product.stock?.find((item) => item.sku === stockSelected?.sku) as Stock,
        }

        const updatedItemsCart = cartItems.filter((item) => item.stock?.sku !== stockSelected?.sku)

        setAddingItemToCart(true)

        setTimeout(() => {
            const updatedCart = [...updatedItemsCart, item]

            setCartItems(updatedCart)

            addToCart(updatedCart)

            setAddingItemToCart(false)
        }, 1000)
    }

    // Función para cargar los elementos del carrito desde la cookie
    const loadCartFromCookie = () => {
        const encryptedCart = decryptCart(cookie)
        setCartItems(encryptedCart)
    }

    useEffect(() => {
        cartCount.set(getTotalCartItemsFromCookie(cookie))
    }, [getTotalCartItemsFromCookie(cookie)])

    useEffect(() => {
        setStockSelected(undefined)
    }, [product])

    useEffect(() => {
        if (cartItems.length > 0) {
            if (checkIfCartHasItems) checkIfCartHasItems(true)
        }
    }, [cartItems])

    // Cargar el carrito al montar el componente
    useEffect(() => {
        loadCartFromCookie()
    }, [])

    return (
        <div className="space-y-3">
            <div>
                <p className="mb-2">
                    <strong>Talla:</strong> {stockSelected?.size ? stockSelected?.size : <span className="text-gray-400 ml-2 text-[12px]">* Seleccione una talla</span>}
                </p>
                <div className="flex items-center space-x-1 ">
                    {product.stock?.map((stock, index) => (
                        <Button
                            key={index}
                            disabled={stock.quantity === 0}
                            variant={stock.size === stockSelected?.size ? 'default' : 'outline'}
                            onClick={() => handleStockSelected(stock)}
                            className={`uppercase aspect-square w-10 h-10 hover:opacity-50 transition-opacity ease-in-out duration-300`}>
                            {stock.size}
                        </Button>
                    ))}
                </div>
                <CustomSheet
                    sheetTitle="Guía de tallas"
                    sheetTrigger={
                        <Button
                            type="button"
                            variant="link"
                            className="underline flex items-center mt-1">
                            <Ruler className="top-[5px] relative" />
                            Guía de tallas
                        </Button>
                    }>
                    <div
                        className="h-[90dvh] overflow-y-scroll"
                        style={{ scrollbarWidth: 'none' }}>
                        {product.photos
                            ?.filter((photo) => photo.isSizeGuide === true)
                            .map((photo, index) => (
                                <picture key={index}>
                                    <img
                                        src={`${URL_BACKEND_UPLOADS}/products/${photo.image}`}
                                        alt=""
                                    />
                                </picture>
                            ))}
                    </div>
                </CustomSheet>
            </div>

            <div className="flex items-center gap-2">
                <Select
                    onValueChange={handleQtyChange}
                    disabled={!qtyBySize}>
                    <SelectTrigger className="w-full flex-[1_1_100px]">
                        <SelectValue placeholder="Cantidad" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {Array.from({ length: qtyBySize }, (_, index) => (
                                <SelectItem
                                    key={index + 1}
                                    value={(index + 1).toString()}>
                                    {index + 1}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button
                    variant="outline"
                    className={`${addingItemToCart ? 'bg-green-200/80 border-green-200' : 'dark:bg-white dark:text-black'} uppercase w-full flex-2`}
                    disabled={!qtyToBuy}
                    onClick={addItemToCart}>
                    {addingItemToCart ? (
                        <PackageCheck
                            color="green"
                            size={20}
                        />
                    ) : (
                        <>Agregar al carrito</>
                    )}
                </Button>
            </div>
            <a
                href="/cart"
                className="[.sheet-dialog_&]:hidden bg-black dark:bg-white text-white dark:text-black p-2 block text-center uppercase rounded-md">
                Finalizar compra
            </a>
        </div>
    )
}
