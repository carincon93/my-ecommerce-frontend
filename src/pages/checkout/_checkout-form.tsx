import type { CartItem, Ecommerce, Order } from '@/lib/types'
import { URL_BACKEND_UPLOADS } from 'astro:env/client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ProductSheet from '@/components/ProductSheet'
import Cart from '@/components/Cart'
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb'
import Loader from '@/components/icons/Loader'

import { Asterisk, TriangleAlert } from 'lucide-react'

import { dniTypes } from '@/lib/data'
import { decryptCart, calculateTotal, decryptDataFromCookie, cartCount, getTotalCartItemsFromCookie, closeSheet } from '@/stores/cartStore'
import { fetchEcommerceData } from '@/services/ecommerceService'
import { createOrUpdateOrder } from '@/services/orderService'

import Cookies from 'js-cookie'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import CustomTooltip from '@/components/CustomTooltip'

interface CheckoutFormProps {
    order?: Order
    onOrderCreatedOrUpdated?: (Order: Order) => void
}

interface CheckedCart {
    isCartChecked: boolean
}

export default function CheckoutForm({ order, onOrderCreatedOrUpdated }: CheckoutFormProps) {
    const [isFormComplete, setIsFormComplete] = useState<boolean>(false)
    const [links, setLinks] = useState<{ title: string; url: string }[]>([{ title: 'Información', url: '#informacion' }])
    const homeLink = { title: 'Carrito', url: '/cart' }

    const [hash, setHash] = useState<string>('')
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [ecommerceData, setEcommerceData] = useState<Ecommerce>()
    const [cartCookie, setCartCookie] = useState<string>('')
    const [checkedCartCookie, setCheckedCartCookie] = useState<string>('')
    const [canProceedToPay, setCanProceedToBuy] = useState<boolean>(false)
    const [totalItemsFromCartCookie, setTotalItemsFromCartCookie] = useState<number>(0)

    const [formData, setFormData] = useState<Partial<Order>>({
        cart: (order?.cart || cartCookie) ?? '',
        customer: {
            id: order?.customer?.id || '',
            name: order?.customer?.name || '',
            lastname: order?.customer?.lastname || '',
            address: order?.customer?.address || '',
            phone: order?.customer?.phone || '',
            email: order?.customer?.email || '',
            country: order?.customer?.country || '',
            city: order?.customer?.city || '',
            state: order?.customer?.state || '',
            dniNumber: order?.customer?.dniNumber || '',
            dniType: order?.customer?.dniType || '',
        },
    })

    const updateNestedState = (obj: any, path: string, value: any): any => {
        const keys = path.split('.')
        let current = obj

        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                current[key] = value // Asignar el valor en la última clave
            } else {
                current[key] = current[key] || {} // Asegurarse de que los objetos intermedios existan
                current = current[key]
            }
        })

        return { ...obj } // Retornar una nueva referencia del objeto
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setFormData((prev) => updateNestedState(prev, name, value))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => updateNestedState(prev, 'customer.dniType', value))
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = await createOrUpdateOrder(undefined, formData)
        if (result.data && onOrderCreatedOrUpdated) onOrderCreatedOrUpdated(result.data)

        if (result.ok) {
            Cookies.remove('cart')
        }
    }

    const handleBreadcrumbLinkClick = () => {
        setTimeout(() => {
            setHash(window.location.hash)
        }, 200)
    }

    const getEcommerceData = async () => {
        const result = await fetchEcommerceData()
        setEcommerceData(result?.data)
    }

    const checkIsFormComplete = () => {
        if (!formData.customer) return false

        const requiredFields = ['name', 'lastname', 'address', 'phone', 'email', 'country', 'city', 'state']

        return requiredFields.every((field) => {
            const value = formData.customer?.[field as keyof typeof formData.customer]
            return value && value.trim() !== ''
        })
    }

    const getCookie = () => {
        const cookie = Cookies.get('cart')
        if (cookie) {
            setCartCookie(cookie)
            setFormData((prev) => ({
                ...prev,
                cart: cookie,
            }))
            getTotalItemsFromCartCookie()
        }
    }

    const getCheckedCartCookie = () => {
        const checkedCartCookie = Cookies.get('checkedCart')
        if (checkedCartCookie) {
            setCheckedCartCookie(checkedCartCookie)
        }
    }

    const getTotalItemsFromCartCookie = () => {
        const totalItemsFromCartCookie = getTotalCartItemsFromCookie(cartCookie)
        setTotalItemsFromCartCookie(totalItemsFromCartCookie)
    }

    useEffect(() => {
        setIsFormComplete(checkIsFormComplete())
    }, [formData])

    useEffect(() => {
        if (isFormComplete && canProceedToPay) {
            setLinks([
                { title: 'Información', url: '#informacion' },
                { title: 'Envío', url: '#envio' },
                { title: 'Pago', url: '#pago' },
            ])
        } else {
            setLinks([{ title: 'Información', url: '#informacion' }])
        }
    }, [isFormComplete && canProceedToPay])

    useEffect(() => {
        const totalPrice = calculateTotal(cartItems)

        setTotalPrice(totalPrice)
        getCookie()
        getCheckedCartCookie()
        getTotalItemsFromCartCookie()
    }, [cartItems])

    useEffect(() => {
        if (cartCookie) {
            const decryptedCartItems = decryptCart(cartCookie)
            setCartItems(decryptedCartItems)
            getCheckedCartCookie()
        }
    }, [cartCookie])

    useEffect(() => {
        if (checkedCartCookie) {
            const decryptedData = decryptDataFromCookie<CheckedCart>(checkedCartCookie)
            setCanProceedToBuy(decryptedData.isCartChecked)
        }
    }, [checkedCartCookie])

    useEffect(() => {
        setHash(window.location.hash)

        getEcommerceData()
    }, [])

    const isFreeShipping = totalPrice >= (ecommerceData?.freeShippingFrom ?? 0)

    const total = isFreeShipping ? totalPrice : totalPrice + (ecommerceData ? ecommerceData?.shipping : 0)

    return (
        <div className="min-h-[60dvh]">
            <div className="mb-8">
                <CustomBreadcrumb
                    currentPath={hash.replace('#', '')}
                    handleBreadcrumbLinkClick={handleBreadcrumbLinkClick}
                    homeLink={homeLink}
                    links={links}
                />
            </div>

            {cartItems.length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-10">
                    <form
                        onSubmit={submit}
                        className="order-2 lg:order-1 max-lg:mt-12">
                        {hash === '#informacion' && (
                            <>
                                <div className="md:grid grid-cols-2 max-md:space-y-8 gap-4">
                                    <fieldset>
                                        <Label
                                            htmlFor="name"
                                            className="flex items-center gap-1 mb-4">
                                            Nombres{' '}
                                            <Asterisk
                                                size={12}
                                                strokeWidth={1}
                                            />
                                        </Label>
                                        <Input
                                            id="name"
                                            name="customer.name"
                                            type="text"
                                            value={formData.customer?.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <Label
                                            htmlFor="lastname"
                                            className="flex items-center gap-1 mb-4">
                                            Apellidos{' '}
                                            <Asterisk
                                                size={12}
                                                strokeWidth={1}
                                            />
                                        </Label>
                                        <Input
                                            id="lastname"
                                            name="customer.lastname"
                                            type="text"
                                            value={formData.customer?.lastname}
                                            onChange={handleChange}
                                            required
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <Label
                                            htmlFor="email"
                                            className="flex items-center gap-1 mb-4">
                                            Correo electrónico{' '}
                                            <Asterisk
                                                size={12}
                                                strokeWidth={1}
                                            />
                                        </Label>
                                        <Input
                                            id="email"
                                            name="customer.email"
                                            type="email"
                                            value={formData.customer?.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <Label
                                            htmlFor="address"
                                            className="flex items-center gap-1 mb-4">
                                            Dirección de residencia{' '}
                                            <Asterisk
                                                size={12}
                                                strokeWidth={1}
                                            />
                                        </Label>
                                        <Input
                                            id="address"
                                            name="customer.address"
                                            type="text"
                                            value={formData.customer?.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </fieldset>

                                    <fieldset className="col-span-2">
                                        <Label
                                            htmlFor="phone"
                                            className="flex items-center gap-1 mb-4">
                                            Número de celular{' '}
                                            <Asterisk
                                                size={12}
                                                strokeWidth={1}
                                            />
                                        </Label>
                                        <Input
                                            id="phone"
                                            name="customer.phone"
                                            type="number"
                                            min="0"
                                            value={formData.customer?.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </fieldset>
                                </div>

                                <div className="md:grid grid-cols-3 gap-4 mt-8 max-md:space-y-8">
                                    <fieldset>
                                        <Label
                                            htmlFor="country"
                                            className="flex items-center gap-1 mb-4">
                                            País{' '}
                                            <Asterisk
                                                size={12}
                                                strokeWidth={1}
                                            />
                                        </Label>
                                        <Input
                                            id="country"
                                            name="customer.country"
                                            type="text"
                                            value={formData.customer?.country}
                                            onChange={handleChange}
                                            required
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <Label
                                            htmlFor="state"
                                            className="flex items-center gap-1 mb-4">
                                            Municipio{' '}
                                            <Asterisk
                                                size={12}
                                                strokeWidth={1}
                                            />
                                        </Label>
                                        <Input
                                            id="state"
                                            name="customer.state"
                                            type="text"
                                            value={formData.customer?.state}
                                            onChange={handleChange}
                                            required
                                        />
                                    </fieldset>

                                    <fieldset>
                                        <Label
                                            htmlFor="city"
                                            className="flex items-center gap-1 mb-4">
                                            Ciudad{' '}
                                            <Asterisk
                                                size={12}
                                                strokeWidth={1}
                                            />
                                        </Label>
                                        <Input
                                            id="city"
                                            name="customer.city"
                                            type="text"
                                            value={formData.customer?.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </fieldset>
                                </div>

                                <a
                                    href={isFormComplete && canProceedToPay ? '#envio' : undefined}
                                    onClick={isFormComplete && canProceedToPay ? handleBreadcrumbLinkClick : (e) => e.preventDefault()}
                                    className={`uppercase w-full bg-black dark:bg-white text-white dark:text-black order-1 block shrink-0 flex-[0_0_25%] p-2 text-center rounded-md mt-8 max-md:text-xs ${
                                        isFormComplete && canProceedToPay ? 'cursor-pointer' : 'opacity-50 pointer-events-none'
                                    }`}>
                                    Continuar con el envío
                                </a>
                            </>
                        )}

                        <div>
                            {hash === '#envio' && isFormComplete && (
                                <>
                                    <div className="flex items-center justify-between p-4 border rounded-md">
                                        <div className="text-gray-400">Contacto</div>

                                        <div className="flex items-center gap-2">
                                            <small>{formData.customer?.email}</small>
                                            <a
                                                href="#informacion"
                                                className="text-xs text-gray-400 ml-4"
                                                onClick={handleBreadcrumbLinkClick}>
                                                Cambiar
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border rounded-md mt-2">
                                        <div className="text-gray-400 shrink-0 mr-6">Enviar a</div>

                                        <div className="flex items-center gap-2">
                                            <small>
                                                {`${formData.customer?.name}  ${formData.customer?.lastname}, ${formData.customer?.address}, `} <br />
                                                {`${formData.customer?.city.toUpperCase()}, ${formData.customer?.state.toUpperCase()}`}
                                            </small>
                                            <a
                                                href="#informacion"
                                                className="text-xs text-gray-400 ml-4"
                                                onClick={handleBreadcrumbLinkClick}>
                                                Cambiar
                                            </a>
                                        </div>
                                    </div>

                                    <h1 className="text-2xl text-gray-400 my-8">Método de envío</h1>

                                    {ecommerceData && (
                                        <div className="p-4 border rounded-md mt-4 flex items-center justify-between">
                                            Envío {isFreeShipping ? 'GRATIS' : 'Estándar'} Nacional (2 a 3 días hábiles ciudades principales. Más de 4 días hábiles otros municipios){' '}
                                            {!isFreeShipping && (
                                                <span className="font-medium ml-4">
                                                    {ecommerceData.shipping.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).replace(/\s/g, '')}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mt-8">
                                        <a
                                            href="#informacion"
                                            onClick={handleBreadcrumbLinkClick}
                                            className="w-full block p-2 text-center rounded-md text-blue-500 underline text-sm">
                                            Regresar a la información
                                        </a>

                                        <a
                                            href="#pago"
                                            onClick={handleBreadcrumbLinkClick}
                                            className="uppercase bg-black w-full text-white bg-black dark:bg-white text-white dark:text-black block p-2 text-center rounded-md max-md:text-xs">
                                            Continuar con el pago
                                        </a>
                                    </div>
                                </>
                            )}
                            {hash === '#pago' && isFormComplete && (
                                <div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <fieldset className="mb-8">
                                            <Label
                                                htmlFor="dniType"
                                                className="flex items-center gap-1 mb-4">
                                                Tipo de documento{' '}
                                                <Asterisk
                                                    size={12}
                                                    strokeWidth={1}
                                                />
                                            </Label>
                                            <Select
                                                name="dniType"
                                                required
                                                onValueChange={handleSelectChange}>
                                                <SelectTrigger id="dniType">
                                                    <SelectValue placeholder="Tipo de documento" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {dniTypes.map((dniType) => (
                                                            <SelectItem
                                                                key={dniType.shortName}
                                                                value={dniType.shortName}>
                                                                {dniType.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </fieldset>

                                        <fieldset>
                                            <Label
                                                htmlFor="dniNumber"
                                                className="flex items-center gap-1 mb-4">
                                                Número de documento{' '}
                                                <Asterisk
                                                    size={12}
                                                    strokeWidth={1}
                                                />
                                            </Label>
                                            <Input
                                                id="dniNumber"
                                                name="customer.dniNumber"
                                                type="number"
                                                min="0"
                                                value={formData.customer?.dniNumber}
                                                onChange={handleChange}
                                                required
                                            />
                                        </fieldset>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <a
                                            href="#envio"
                                            onClick={handleBreadcrumbLinkClick}
                                            className="w-full block p-2 text-center rounded-md text-blue-500 underline text-sm">
                                            Regresar al envío
                                        </a>

                                        <Button
                                            type="submit"
                                            disabled={!(isFormComplete && canProceedToPay)}
                                            className="w-full !uppercase col-span-2">
                                            Continuar
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {hash !== '#informacion' && !isFormComplete && (
                                <>
                                    <h1>No ha diligenciado la información principal</h1>
                                    <a
                                        href="#informacion"
                                        onClick={handleBreadcrumbLinkClick}
                                        className="text-blue-500 underline">
                                        Diligenciar información
                                    </a>
                                </>
                            )}
                        </div>
                    </form>

                    <div className="relative order-1 lg:order-2 lg:mt-10">
                        <div className="mb-9 lg:-translate-y-10">
                            <div
                                className={`${cartItems.length > 4 ? 'h-[35dvh] overflow-y-scroll' : ''}`}
                                style={{ scrollbarWidth: 'none' }}>
                                {cartItems.slice(0, 2).map((cartItem) => (
                                    <div
                                        key={cartItem.stock.sku}
                                        className="border rounded-md mb-2 p-4 flex items-center justify-between">
                                        <picture className="shrink-0">
                                            <img
                                                src={`${URL_BACKEND_UPLOADS}/products/${cartItem.image}`}
                                                className="size-20 object-cover rounded-md"
                                                style={{ viewTransitionName: `product-${cartItem.slug}-image` }}
                                                alt=""
                                            />
                                        </picture>

                                        <span className="ml-4 justify-self-start flex-1 leading-5 max-md:text-xs">{cartItem.name + ' - ' + cartItem.stock.size}</span>

                                        <span className="ml-4 max-md:text-xs">
                                            (x{cartItem.quantity}){' '}
                                            {(cartItem.price * cartItem.quantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).replace(/\s/g, '')}
                                        </span>
                                    </div>
                                ))}

                                <div className="bg-white/0 relative -top-8 backdrop-blur-lg py-10 space-y-4">
                                    <ProductSheet
                                        sheetId="product-sheet-checkout"
                                        sheetTrigger={<Button className="w-full uppercase p-2.5">Ver todos los productos ({totalItemsFromCartCookie})</Button>}
                                        sheetTitle="Mi carrito de compras"
                                        classNameIdentifier="cart-dialog">
                                        <Cart
                                            classNameIdentifier="checkout-dialog"
                                            setData={setCartItems}
                                        />
                                        <div className="h-[15dvh] flex items-center">
                                            <Button
                                                type="button"
                                                className="uppercase w-full"
                                                onClick={() => closeSheet('product-sheet-checkout')}>
                                                Continuar
                                            </Button>
                                        </div>
                                    </ProductSheet>

                                    {!canProceedToPay && (
                                        <CustomTooltip
                                            side="right"
                                            tooltipTrigger={
                                                <Button className="bg-red-500 w-[57px]">
                                                    <TriangleAlert />
                                                </Button>
                                            }
                                            contentBackground="bg-red-500">
                                            <p>
                                                Has seleccionado {totalItemsFromCartCookie} ítems, pero el stock disponible es insuficiente. <br />
                                                Por favor, elije una cantidad menor.
                                            </p>
                                        </CustomTooltip>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between px-9 py-2 border rounded-md mb-1 mt-2">
                                <span>Subtotal</span>
                                <span>{totalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).replace(/\s/g, '')}</span>
                            </div>
                            <div className="flex items-center justify-between px-9 py-2 border rounded-md mb-1">
                                <span>Envío</span>
                                <span>
                                    {isFreeShipping
                                        ? '¡GRATIS!'
                                        : totalPrice > 0
                                        ? ecommerceData?.shipping.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).replace(/\s/g, '')
                                        : '$0'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between px-9 py-2 border rounded-md mb-1">
                                <span>Total</span>
                                <strong>{totalPrice > 0 ? total.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).replace(/\s/g, '') : '$0'}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-[inherit] flex flex-col items-center justify-center space-y-20">
                    <Loader className="text-orange-400" />
                    <a href="/">
                        😩 <span className="underline">No hay productos en tu carrito. Clic aquí para volver a la tienda.</span>
                    </a>
                </div>
            )}
        </div>
    )
}
