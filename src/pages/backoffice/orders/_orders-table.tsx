import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomSheet from '@/components/CustomSheet'
import { Button } from '@/components/ui/button.tsx'
import { CustomDialog } from '@/components/CustomDialog.tsx'

import type { Order, CartItem, OrderItem } from '@/lib/types'
import { deleteOrder, fetchOrdersData } from '@/services/orderService.ts'

import { URL_BACKEND_UPLOADS } from 'astro:env/client'
import { Contact, PackageCheck, PackageSearch, PackageX, Trash2, Truck, UserPen } from 'lucide-react'
import { useToast } from '@/hooks/use-toast.ts'
import { useEffect, useState } from 'react'
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb.tsx'
import CustomerForm from '../customers/_customer-form'
import { decryptCart } from '@/stores/cartStore'
import OrderForm from './_order-form'
import { formatPhoneNumber } from '@/lib/utils'
import { createOrUpdateOrderItem } from '@/services/orderItemService'

interface ActionsProps {
    order: Order
    handleOrderOperation: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const Actions = ({ order, handleOrderOperation }: ActionsProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [orderItemFormData, setOrderItemFormData] = useState<Partial<OrderItem>>({
        orderId: '',
        sku: '',
    })

    const decryptCartFromOrder = () => {
        const decryptedData = decryptCart(order.cart)
        setCartItems(decryptedData)
    }

    const getOrderItemBySku = (sku: string): OrderItem | undefined => {
        return order.items.find((item) => item.sku === sku)
    }

    const handleDeleteOrder = async () => {
        const result = await deleteOrder(order)

        handleOrderOperation(result)
    }

    const handlePackageStatus = async (cartItem: CartItem) => {
        setOrderItemFormData((prev) => ({
            ...prev,
            orderId: order.id,
            sku: cartItem.stock.sku,
        }))
    }

    const submitOrderItem = async () => {
        const orderItem = order.items.find((item) => item.status === orderItemFormData.sku)

        const result = await createOrUpdateOrderItem(orderItem, orderItemFormData)
        handleOrderOperation(result)
    }

    useEffect(() => {
        if (orderItemFormData.orderId) {
            submitOrderItem()
        }
    }, [orderItemFormData])

    useEffect(() => {
        decryptCartFromOrder()
    }, [])

    return (
        <>
            <CustomSheet
                side="bottom"
                sheetTrigger={
                    <Button>
                        <PackageSearch size={16} />
                    </Button>
                }>
                <h1 className="text-center font-semibold text-2xl mb-4">
                    Detalles del pedido
                    <br />
                    <span className="text-xs">
                        <strong>ID del pedido:</strong> {order.id}
                    </span>
                </h1>

                <CustomSheet
                    sheetTitle={`ID: ${order.id}`}
                    sheetTrigger={
                        <Button className="flex items-center gap-2 -translate-y-2 lg:translate-y-8">
                            <Contact />
                            Ver información del cliente
                        </Button>
                    }>
                    <ul className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs pb-4">
                        <li className="p-2 rounded-md border bg-slate-100/40 flex items-center justify-between">
                            <strong>Nombres: </strong>
                            {order.customer.name}
                        </li>
                        <li className="p-2 rounded-md border bg-slate-100/40 flex items-center justify-between">
                            <strong>Apellidos: </strong>
                            {order.customer.lastname}
                        </li>
                        <li className="p-2 rounded-md border bg-slate-100/40 flex items-center justify-between">
                            <strong>Dirección de residencia: </strong>
                            {order.customer.address}
                        </li>
                        <li className="p-2 rounded-md border bg-slate-100/40 flex items-center justify-between">
                            <strong>Número de celular: </strong>
                            {formatPhoneNumber(order.customer.phone)}
                        </li>
                        <li className="p-2 rounded-md border bg-slate-100/40 flex items-center justify-between">
                            <strong>País: </strong>
                            {order.customer.country}
                        </li>
                        <li className="p-2 rounded-md border bg-slate-100/40 flex items-center justify-between">
                            <strong>Departamento: </strong>
                            {order.customer.state}
                        </li>
                        <li className="p-2 rounded-md border bg-slate-100/40 flex items-center justify-between">
                            <strong>Ciudad: </strong>
                            {order.customer.city}
                        </li>
                        <li className="p-2 rounded-md border bg-slate-100/40 flex items-center justify-between">
                            <strong>Correo electrónico: </strong>
                            {order.customer.email}
                        </li>
                    </ul>
                </CustomSheet>

                <div
                    className="lg:mt-20 h-[60dvh] pt-10 overflow-y-auto"
                    style={{ scrollbarWidth: 'none' }}>
                    {cartItems.map((cartItem, index) => (
                        <ul
                            key={index}
                            className="flex flex-col md:flex-row md:items-center justify-around flex-wrap gap-4 shadow-md border px-2 py-12 lg:py-8 rounded-md space-x-2 mb-20 relative max-md:text-xs">
                            <li className="py-1 px-3 rounded-md border text-center absolute -top-8 bg-white text-black flex items-center">
                                <picture className="relative block rounded-md mr-2">
                                    <img
                                        src={`${URL_BACKEND_UPLOADS}/products/${cartItem.image}`}
                                        className="block size-10 rounded-md object-cover"
                                        alt=""
                                    />
                                </picture>
                                <div>
                                    {cartItem.name}
                                    <br />
                                    <small>{cartItem.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} Unit.</small>
                                </div>
                            </li>
                            <li className="flex items-center justify-between">
                                <strong>Cantidad: </strong>
                                <span className="py-1 px-3 rounded-md border bg-slate-100/40 ml-2">{cartItem.quantity}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <strong>Talla: </strong>
                                <span className="py-1 px-3 rounded-md border bg-slate-100/40 ml-2">{cartItem.stock.size}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <strong>SKU: </strong>
                                <span className="py-1 px-3 rounded-md border bg-slate-100/40 ml-2">{cartItem.stock.sku}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <Button
                                    type="button"
                                    className={`${getOrderItemBySku(cartItem.stock.sku)?.status === 'packed' ? 'bg-green-500' : ''}`}
                                    onClick={() => handlePackageStatus(cartItem)}>
                                    {getOrderItemBySku(cartItem.stock.sku)?.status === 'packed' ? <PackageCheck /> : <PackageX />}
                                </Button>
                            </li>
                        </ul>
                    ))}
                </div>
            </CustomSheet>

            <CustomSheet
                side="right"
                sheetTrigger={
                    <Button className={`border ${order.trackingNumber ? 'border-gray-200' : 'border-red-400'}`}>
                        <Truck
                            size={16}
                            color={`${order.trackingNumber ? 'black' : 'red'}`}
                        />
                    </Button>
                }>
                <OrderForm
                    order={order}
                    onOrderCreatedOrUpdated={handleOrderOperation}
                />
            </CustomSheet>

            <CustomerSheet
                order={order}
                onCreateOrUpdateCustomer={handleOrderOperation}
            />

            <CustomDialog
                triggerText={
                    <Button type="button">
                        <Trash2
                            color="red"
                            size="8px"
                        />
                    </Button>
                }
                dialogTitle="Eliminar pedido"
                dialogDescription={`¿Está seguro/a que desea eliminar el pedido: ${order.id}?`}>
                <Button onClick={handleDeleteOrder}>Seguro/a</Button>
            </CustomDialog>
        </>
    )
}

interface CustomerSheetProps {
    order?: Order
    onCreateOrUpdateCustomer?: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const CustomerSheet = ({ order, onCreateOrUpdateCustomer }: CustomerSheetProps) => {
    return (
        <CustomSheet
            sheetTrigger={
                <Button>
                    <UserPen size={14} />
                </Button>
            }>
            <CustomerForm
                onCustomerCreatedOrUpdated={onCreateOrUpdateCustomer}
                customer={order?.customer}
            />
        </CustomSheet>
    )
}

interface CellProps {
    order: Order
    handleOrderOperation: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const Cell = ({ order, handleOrderOperation }: CellProps) => {
    return (
        <>
            <TableCell>
                <small>{order.id}</small>
            </TableCell>
            <TableCell>
                <span className={`${order.status == 'COMPLETED' ? 'bg-green-500' : order.status === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'} text-white p-2 rounded-md text-xs`}>
                    {order.status}
                </span>
            </TableCell>

            <TableCell>
                <div className="grid grid-cols-3 text-xs">
                    <div>
                        <strong>($) Carrito</strong>
                        <br />
                        {order.totalCart.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                    </div>
                    <div className="ml-5">
                        <strong>Envío</strong>
                        <br />
                        {order.totalCart >= order.ecommerce.freeShippingFrom ? 'Gratis' : order.ecommerce.shipping.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                    </div>
                    <div>
                        <strong>Total a pagar</strong>
                        <br />
                        {order.totalWithShipping.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                    </div>
                </div>
            </TableCell>

            <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                    <Actions
                        order={order}
                        handleOrderOperation={handleOrderOperation}
                    />
                </div>
            </TableCell>
        </>
    )
}

export default function OrdersTable() {
    const [orders, setOrders] = useState<Order[]>([])
    const { toast } = useToast()

    const handleOrderOperation = async (result: { ok: boolean; success?: string; error?: string }) => {
        getOrders()

        if (result.ok) {
            toast({
                title: 'Good',
                description: result.success,
            })
        } else {
            toast({
                title: 'Bad',
                description: result.error,
            })
        }
    }

    const getOrders = async () => {
        const result = await fetchOrdersData()
        if (result.data) setOrders(result.data)
    }

    useEffect(() => {
        getOrders()
    }, [])

    const dropdownLinks = [
        { title: 'Categorías', url: '/backoffice/categories' },
        { title: 'Clientes', url: '/backoffice/customers' },
        { title: 'Mi E-Commerce', url: '/backoffice/my-ecommerce' },
        { title: 'Políticas', url: '/backoffice/policies' },
        { title: 'Productos', url: '/backoffice/products' },
    ]
    const homeLink = { title: 'Backoffice', url: '/backoffice' }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-medium mb-6 text-center">
                <span style={{ viewTransitionName: 'orders-text' }}>Pedidos</span>
            </h1>

            <div className="max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl mx-auto lg:shadow-md rounded-sm p-4">
                <div className="mb-4">
                    <CustomBreadcrumb
                        homeLink={homeLink}
                        currentPath="Pedidos"
                        dropdownLinks={dropdownLinks}
                    />
                </div>

                <Table className="table-fixed border-separate border-spacing-y-3 hidden lg:table max-md:text-xs">
                    <TableHeader className="invisible lg:visible">
                        <TableRow>
                            <TableHead className="uppercase text-xs">Id</TableHead>
                            <TableHead className="uppercase text-xs">Estado</TableHead>
                            <TableHead className="uppercase text-xs">Total</TableHead>
                            <TableHead className="uppercase text-xs text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders && orders.length > 0 ? (
                            orders.map((order, index) => (
                                <TableRow
                                    key={index}
                                    className="relative bg-white/80 dark:bg-white/10 backdrop-blur-sm shadow-sm hover:opacity-80"
                                    style={{ viewTransitionName: index === 0 ? 'orders-box' : '' }}>
                                    <Cell
                                        order={order}
                                        handleOrderOperation={handleOrderOperation}
                                    />
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <div
                                        className="bg-white/20 backdrop-blur-sm p-4 flex items-center"
                                        style={{ viewTransitionName: 'orders-box' }}>
                                        No hay pedidos para mostrar
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="block lg:hidden">
                    {orders && orders.length > 0 ? (
                        orders.map((order, index) => (
                            <div
                                key={index}
                                className="relative bg-white/80 backdrop-blur-sm shadow-sm text-xs p-2 mb-4">
                                <div className="py-4">
                                    <strong>ID:{order.id}</strong>
                                </div>

                                <div className="bg-white/80">
                                    <div className="grid grid-cols-4 text-xs">
                                        <div>
                                            <strong>($) Carrito</strong>
                                            <br />
                                            {order.totalCart.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                                        </div>
                                        <div>
                                            <strong>Envío</strong>
                                            <br />
                                            {order.totalCart >= order.ecommerce.freeShippingFrom ? 'Gratis' : order.ecommerce.shipping.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                                        </div>
                                        <div>
                                            <strong>Total a pagar</strong>
                                            <br />
                                            {order.totalWithShipping.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                                        </div>
                                        <div>
                                            <span
                                                className={`${
                                                    order.status == 'COMPLETED' ? 'bg-green-500' : order.status === 'PENDING' ? 'bg-yellow-500' : 'bg-red-500'
                                                } text-white p-1 rounded-md mt-1 inline-block`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex mt-4 space-x-2">
                                    <Actions
                                        order={order}
                                        handleOrderOperation={handleOrderOperation}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div
                            className="bg-white p-4"
                            style={{ viewTransitionName: 'orders-box' }}>
                            No hay pedidos para mostrar
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
