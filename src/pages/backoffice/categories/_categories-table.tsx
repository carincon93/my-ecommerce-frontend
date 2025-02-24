import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomSheet from '@/components/CustomSheet'
import { Button } from '@/components/ui/button.tsx'

import type { Category } from '@/lib/types'
import CategoryForm from './_category-form.tsx'

import { deleteCategory, fetchCategoriesData } from '@/services/categoryService.ts'

import { useEffect, useState } from 'react'
import { CustomDialog } from '@/components/CustomDialog.tsx'
import { Edit2, PlusIcon, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast.ts'
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb.tsx'

interface CategorySheetProps {
    category?: Category
    onCreateOrUpdateCategory?: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const CategorySheet = ({ category, onCreateOrUpdateCategory }: CategorySheetProps) => {
    return (
        <CustomSheet
            sheetTrigger={
                <Button>
                    {category ? (
                        <Edit2 size={14} />
                    ) : (
                        <small className="flex items-center gap-2 pr-1">
                            <PlusIcon size={14} /> Añadir categoría
                        </small>
                    )}
                </Button>
            }>
            <CategoryForm
                onCategoryCreatedOrUpdated={onCreateOrUpdateCategory}
                category={category}
            />
        </CustomSheet>
    )
}

interface CellProps {
    category: Category
    onUpdateOrDeleteCategory: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const Cell = ({ category, onUpdateOrDeleteCategory }: CellProps) => {
    const handleDeleteCategory = async () => {
        const result = await deleteCategory(category)
        onUpdateOrDeleteCategory(result)
    }

    return (
        <>
            <TableCell>{category.title}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell className="text-right">
                <div
                    className="flex justify-end space-x-2
                ">
                    <CategorySheet
                        category={category}
                        onCreateOrUpdateCategory={onUpdateOrDeleteCategory}
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
                        dialogTitle="Eliminar categoría"
                        dialogDescription={`¿Está seguro/a que desea eliminar la categoría: ${category.name}?`}>
                        <Button onClick={handleDeleteCategory}>Seguro/a</Button>
                    </CustomDialog>
                </div>
            </TableCell>
        </>
    )
}

export default function CategoriesTable() {
    const [categories, setCategories] = useState<Category[]>([])
    const { toast } = useToast()

    const handleCategoryOperation = async (result: { ok: boolean; success?: string; error?: string }) => {
        getCategories()

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

    const getCategories = async () => {
        const result = await fetchCategoriesData()
        if (result.data) setCategories(result.data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const dropdownLinks = [
        { title: 'Clientes', url: '/backoffice/customers' },
        { title: 'Mi E-Commerce', url: '/backoffice/my-ecommerce' },
        { title: 'Pedidos', url: '/backoffice/orders' },
        { title: 'Políticas', url: '/backoffice/policies' },
        { title: 'Productos', url: '/backoffice/products' },
    ]
    const homeLink = { title: 'Backoffice', url: '/backoffice' }

    return (
        <div className="max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-medium mb-6 text-center">
                <span style={{ viewTransitionName: 'categories-text' }}>Categorías</span>
            </h1>

            <div className="max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl mx-auto lg:shadow-md rounded-sm p-4">
                <div className="mb-4">
                    <CustomBreadcrumb
                        homeLink={homeLink}
                        currentPath="Categorías"
                        dropdownLinks={dropdownLinks}
                    />
                </div>

                <CategorySheet onCreateOrUpdateCategory={handleCategoryOperation} />

                <Table className="table-fixed border-separate border-spacing-y-3 max-md:text-xs">
                    <TableHeader className="invisible lg:visible">
                        <TableRow>
                            <TableHead className="uppercase text-xs">Título</TableHead>
                            <TableHead className="uppercase text-xs">Categoría</TableHead>
                            <TableHead className="uppercase text-xs text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories && categories.length > 0 ? (
                            categories.map((category, index) => (
                                <TableRow
                                    key={index}
                                    className="relative bg-white/80 dark:bg-white/10 backdrop-blur-sm shadow-sm hover:opacity-80"
                                    style={{ viewTransitionName: index === 0 ? 'categories-box' : '' }}>
                                    <Cell
                                        category={category}
                                        onUpdateOrDeleteCategory={handleCategoryOperation}
                                    />
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <div
                                        className="bg-white/20 backdrop-blur-sm p-4 min-h-[47.33px] flex items-center"
                                        style={{ viewTransitionName: 'categories-box' }}>
                                        No hay categorías para mostrar
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
