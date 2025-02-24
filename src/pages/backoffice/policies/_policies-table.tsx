import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomSheet from '@/components/CustomSheet'
import { Button } from '@/components/ui/button.tsx'
import { CustomDialog } from '@/components/CustomDialog.tsx'

import type { Policy } from '@/lib/types'
import { deletePolicy, fetchPoliciesData } from '@/services/policyService.ts'
import PolicyForm from './_policy-form.tsx'

import { URL_BACKEND } from 'astro:env/client'
import { Edit2, PlusIcon, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast.ts'
import { useEffect, useState } from 'react'
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb.tsx'

interface PolicySheetProps {
    policy?: Policy
    onPolicyCreatedOrUpdated?: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const PolicySheet = ({ policy, onPolicyCreatedOrUpdated }: PolicySheetProps) => {
    return (
        <CustomSheet
            sheetTrigger={
                <Button>
                    {policy ? (
                        <Edit2 size={14} />
                    ) : (
                        <small className="flex items-center gap-2 pr-1">
                            <PlusIcon size={14} /> Añadir política
                        </small>
                    )}
                </Button>
            }>
            <PolicyForm
                onPolicyCreatedOrUpdated={onPolicyCreatedOrUpdated}
                policy={policy}
            />
        </CustomSheet>
    )
}

interface CellProps {
    policy: Policy
    handlePolicyOperation: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const Cell = ({ policy, handlePolicyOperation }: CellProps) => {
    const handleDeletePolicy = async () => {
        const result = await deletePolicy(policy)

        handlePolicyOperation(result)
    }

    return (
        <>
            <TableCell>
                <strong>{policy.title}</strong>
            </TableCell>
            <TableCell>
                <p
                    className="text-xs lg:text-md line-clamp-5 overflow-hidden whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: policy.content }}></p>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                    <PolicySheet
                        policy={policy}
                        onPolicyCreatedOrUpdated={handlePolicyOperation}
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
                        dialogTitle="Eliminar política"
                        dialogDescription={`¿Está seguro/a que desea eliminar la política: ${policy.title}?`}>
                        <Button onClick={handleDeletePolicy}>Seguro/a</Button>
                    </CustomDialog>
                </div>
            </TableCell>
        </>
    )
}

export default function PoliciesTable() {
    const [policies, setPolicies] = useState<Policy[]>([])
    const { toast } = useToast()

    const handlePolicyOperation = async (result: { ok: boolean; success?: string; error?: string }) => {
        getPolicies()

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

    const getPolicies = async () => {
        const result = await fetchPoliciesData()

        if (result.data) setPolicies(result.data)
    }

    useEffect(() => {
        getPolicies()
    }, [])

    const dropdownLinks = [
        { title: 'Categorías', url: '/backoffice/categories' },
        { title: 'Clientes', url: '/backoffice/customers' },
        { title: 'Mi E-Commerce', url: '/backoffice/my-ecommerce' },
        { title: 'Pedidos', url: '/backoffice/orders' },
        { title: 'Productos', url: '/backoffice/products' },
    ]
    const homeLink = { title: 'Backoffice', url: '/backoffice' }

    return (
        <div className="max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-medium mb-6 text-center">
                <span style={{ viewTransitionName: 'policies-text' }}>Políticas</span>
            </h1>

            <div className="max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl mx-auto lg:shadow-md rounded-sm p-4">
                <div className="mb-4">
                    <CustomBreadcrumb
                        homeLink={homeLink}
                        currentPath="Políticas"
                        dropdownLinks={dropdownLinks}
                    />
                </div>
                <PolicySheet onPolicyCreatedOrUpdated={handlePolicyOperation} />
                <Table className="table-fixed border-separate border-spacing-y-3">
                    <TableHeader className="invisible lg:visible">
                        <TableRow>
                            <TableHead className="uppercase text-xs">Título</TableHead>
                            <TableHead className="uppercase text-xs">Contenido</TableHead>
                            <TableHead className="uppercase text-xs text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {policies && policies.length > 0 ? (
                            policies.map((policy, index) => (
                                <TableRow
                                    key={index}
                                    className="relative bg-white/80 dark:bg-white/10 backdrop-blur-sm hover:opacity-80 shadow-sm"
                                    style={{ viewTransitionName: index === 0 ? 'polcies-box' : '' }}>
                                    <Cell
                                        policy={policy}
                                        handlePolicyOperation={handlePolicyOperation}
                                    />
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <div
                                        className="bg-white/20 backdrop-blur-sm p-4 flex items-center"
                                        style={{ viewTransitionName: 'policies-box' }}>
                                        No hay políticas para mostrar
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
