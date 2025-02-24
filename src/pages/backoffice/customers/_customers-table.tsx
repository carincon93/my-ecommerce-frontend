import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomSheet from '@/components/CustomSheet'
import { Button } from '@/components/ui/button.tsx'

import type { Customer } from '@/lib/types'
import CustomerForm from './_customer-form.tsx'

import { deleteCustomer, fetchCustomersData } from '@/services/customerService.ts'

import { useEffect, useState } from 'react'
import { CustomDialog } from '@/components/CustomDialog.tsx'
import { Edit2, PlusIcon, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast.ts'
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb.tsx'

interface CustomerSheetProps {
    customer?: Customer
    onCreateOrUpdateCustomer?: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const CustomerSheet = ({ customer, onCreateOrUpdateCustomer }: CustomerSheetProps) => {
    return (
        <CustomSheet
            sheetTrigger={
                <Button>
                    {customer ? (
                        <Edit2 size={14} />
                    ) : (
                        <small className="flex items-center gap-2 pr-1">
                            <PlusIcon size={14} /> Añadir cliente
                        </small>
                    )}
                </Button>
            }>
            <CustomerForm
                onCustomerCreatedOrUpdated={onCreateOrUpdateCustomer}
                customer={customer}
            />
        </CustomSheet>
    )
}

interface CellProps {
    customer: Customer
    onUpdateOrDeleteCustomer: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const Cell = ({ customer, onUpdateOrDeleteCustomer }: CellProps) => {
    const handleDeleteCustomer = async () => {
        const result = await deleteCustomer(customer)
        onUpdateOrDeleteCustomer(result)
    }

    return (
        <>
            <TableCell>{customer.name + ' ' + customer.lastname}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                    <CustomerSheet
                        customer={customer}
                        onCreateOrUpdateCustomer={onUpdateOrDeleteCustomer}
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
                        dialogTitle="Eliminar cliente"
                        dialogDescription={`¿Está seguro/a que desea eliminar el cliente: ${customer.name}?`}>
                        <Button onClick={handleDeleteCustomer}>Seguro/a</Button>
                    </CustomDialog>
                </div>
            </TableCell>
        </>
    )
}

export default function CustomersTable() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const { toast } = useToast()

    const handleCustomerOperation = async (result: { ok: boolean; success?: string; error?: string }) => {
        getCustomers()

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

    const getCustomers = async () => {
        const result = await fetchCustomersData()
        if (result.data) setCustomers(result.data)
    }

    useEffect(() => {
        getCustomers()
    }, [])

    const dropdownLinks = [
        { title: 'Categorías', url: '/backoffice/categories' },
        { title: 'Mi E-Commerce', url: '/backoffice/my-ecommerce' },
        { title: 'Pedidos', url: '/backoffice/orders' },
        { title: 'Políticas', url: '/backoffice/policies' },
        { title: 'Productos', url: '/backoffice/products' },
    ]
    const homeLink = { title: 'Backoffice', url: '/backoffice' }

    return (
        <div className="max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-medium mb-6 text-center">
                <span style={{ viewTransitionName: 'customers-text' }}>Clientes</span>
            </h1>

            <div className="max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl mx-auto lg:shadow-md rounded-sm p-4">
                <div className="mb-4">
                    <CustomBreadcrumb
                        homeLink={homeLink}
                        currentPath="Clientes"
                        dropdownLinks={dropdownLinks}
                    />
                </div>

                <CustomerSheet onCreateOrUpdateCustomer={handleCustomerOperation} />

                <Table className="table-fixed  border-separate border-spacing-y-3 max-md:text-xs">
                    <TableHeader className="invisible lg:visible">
                        <TableRow>
                            <TableHead className="uppercase text-xs">Nombre</TableHead>
                            <TableHead className="uppercase text-xs">Correo electrónico</TableHead>
                            <TableHead className="uppercase text-xs text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers && customers.length > 0 ? (
                            customers.map((customer, index) => (
                                <TableRow
                                    key={index}
                                    className="relative bg-white/80 dark:bg-white/10 backdrop-blur-sm shadow-sm hover:opacity-80"
                                    style={{ viewTransitionName: index === 0 ? 'customers-box' : '' }}>
                                    <Cell
                                        customer={customer}
                                        onUpdateOrDeleteCustomer={handleCustomerOperation}
                                    />
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <div
                                        className="bg-white/20 backdrop-blur-sm p-4 min-h-[47.33px] flex items-center"
                                        style={{ viewTransitionName: 'customers-box' }}>
                                        No hay clientes para mostrar
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
