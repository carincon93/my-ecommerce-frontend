import type { Stock, Product } from '@/lib/types'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Asterisk, TriangleAlert } from 'lucide-react'
import { createOrUpdateStock } from '@/services/productService'

interface StockFormProps {
    method: string
    product: Product
    stock?: Stock
    onStockCreated: (result: { ok: boolean; success?: string | undefined; error?: string | undefined }) => Promise<void>
}

const sizes = [{ size: 'S' }, { size: 'M' }, { size: 'L' }, { size: 'XL' }]

export default function StockForm({ method, product, stock, onStockCreated }: StockFormProps) {
    const [formData, setFormData] = useState<Partial<Stock>>({
        productId: product.id,
        quantity: stock?.quantity || 0,
        size: stock?.size || '',
        sku: stock?.sku || '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            size: value,
        }))
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = await createOrUpdateStock(product, stock?.id, formData)
        onStockCreated(result)
    }

    const sizesFiltered = sizes?.filter((sizeItem) => !product.stock?.some((stockItem) => stockItem.size === sizeItem.size))

    return (
        <form
            onSubmit={submit}
            className="space-y-8">
            <fieldset>
                <Label
                    htmlFor="quantity"
                    className="flex items-center gap-1 mb-4">
                    Cantidad{' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={0}
                    onChange={handleChange}
                    value={formData.quantity}
                    required
                />
            </fieldset>
            {method === 'create' && (
                <fieldset>
                    <Label
                        htmlFor="size"
                        className="flex items-center gap-1 mb-4">
                        Talla{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Select
                        name="size"
                        required
                        value={formData.size}
                        disabled={sizesFiltered && sizesFiltered?.length === 0}
                        onValueChange={handleSelectChange}>
                        <SelectTrigger id="size">
                            <SelectValue placeholder={sizesFiltered && sizesFiltered?.length === 0 ? 'No hay más tallas para relacionar' : 'Seleccione una talla'} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {sizesFiltered.map((sizeItem, index) => (
                                    <SelectItem
                                        key={index}
                                        value={sizeItem.size}>
                                        {sizeItem.size}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </fieldset>
            )}

            <Button
                type="submit"
                disabled={sizesFiltered && sizesFiltered?.length === 0 && method === 'create'}
                className="w-full mt-4">
                Guardar
            </Button>
        </form>
    )
}
