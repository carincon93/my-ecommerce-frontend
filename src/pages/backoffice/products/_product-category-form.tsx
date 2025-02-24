import type { ProductCategory, Product, Category } from '@/lib/types'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { fetchCategoriesData } from '@/services/categoryService'

import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Asterisk, TriangleAlert } from 'lucide-react'
import { linkProductCategory } from '@/services/productService'

interface ProductCategoryFormProps {
    product: Product
    productCategories: ProductCategory[]
    onProductCategoryAdded: (result: { ok: boolean; success?: string | undefined; error?: string | undefined }) => Promise<void>
}

export default function ProductCategoryForm({ product, productCategories, onProductCategoryAdded }: ProductCategoryFormProps) {
    const [categories, setCategories] = useState<Category[]>()
    const [formData, setFormData] = useState<Partial<ProductCategory>>({
        productId: product.id,
        categoryId: '',
    })

    const handleChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            categoryId: value,
        }))
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = await linkProductCategory(product, formData)
        onProductCategoryAdded(result)
    }

    const getCategories = async () => {
        const result = await fetchCategoriesData()
        setCategories(result.data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const categoriesFiltered = categories?.filter((category) => !product.categories?.some((item) => item.category.name === category.name))

    return (
        <form
            onSubmit={submit}
            className="space-y-8">
            {categoriesFiltered && categoriesFiltered?.length > 0 ? (
                <>
                    <fieldset>
                        <Label
                            htmlFor="categoryId"
                            className="flex items-center gap-1 mb-4">
                            Categoría{' '}
                            <Asterisk
                                size={12}
                                strokeWidth={1}
                            />
                        </Label>
                        <Select
                            name="categoryId"
                            required
                            onValueChange={handleChange}>
                            <SelectTrigger id="categoryId">
                                <SelectValue placeholder="Seleccione una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {categoriesFiltered.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </fieldset>

                    <Button
                        type="submit"
                        className="w-full mt-4">
                        Guardar
                    </Button>
                </>
            ) : (
                <small className="flex items-center gap-2 text-red-400 py-4">
                    <TriangleAlert size={16} />
                    No hay categorías para relacionar
                </small>
            )}
        </form>
    )
}
