import type { Product, ProductVariant } from '@/lib/types'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { linkProductVariant } from '@/services/productService'

import { useState, type FormEvent } from 'react'
import { Asterisk, TriangleAlert } from 'lucide-react'

interface ProductVariantFormProps {
    product: Product
    products: Product[]

    onProductVariantLinked: (result: { ok: boolean; success?: string | undefined; error?: string | undefined }) => Promise<void>
}

export default function ProductVariantForm({ product, products, onProductVariantLinked }: ProductVariantFormProps) {
    const [formData, setFormData] = useState<Partial<ProductVariant>>({
        variantId: '',
        productId: product.id,
    })

    const handleChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            variantId: value,
        }))
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = await linkProductVariant(product, formData)
        onProductVariantLinked(result)
    }

    const productVariants = product.variants

    const restProducts = products?.filter((itemProduct) => !productVariants?.some((item) => item.mainProduct?.id === itemProduct.id) && itemProduct.name !== product.name)

    return (
        <form
            onSubmit={submit}
            className="space-y-8">
            {restProducts && restProducts?.length > 0 ? (
                <div className="space-y-8">
                    <fieldset>
                        <Label
                            htmlFor="variantId"
                            className="flex items-center gap-1 mb-4">
                            Variante{' '}
                            <Asterisk
                                size={12}
                                strokeWidth={1}
                            />
                        </Label>
                        <Select
                            name="variantId"
                            onValueChange={handleChange}
                            required>
                            <SelectTrigger id="">
                                <SelectValue placeholder="Seleccione una variante" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {restProducts?.map((product) => (
                                        <SelectItem
                                            key={product.id}
                                            value={product.id}>
                                            {product.name + ' - ' + product.colorName}
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
                </div>
            ) : (
                <small className="flex items-center gap-2 text-red-400 py-4">
                    <TriangleAlert size={16} />
                    No hay productos para relacionar
                </small>
            )}
        </form>
    )
}
