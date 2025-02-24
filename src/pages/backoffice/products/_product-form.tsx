import type { Product } from '@/lib/types'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Asterisk, Mouse } from 'lucide-react'
import { createOrUpdateProduct } from '@/services/productService'

interface ProductFormProps {
    product?: Product
    onProductCreatedOrUpdated?: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

export default function ProductForm({ product, onProductCreatedOrUpdated }: ProductFormProps) {
    const [formData, setFormData] = useState<Partial<Product>>({
        name: product?.name || '',
        colorName: product?.colorName || '',
        colorHex: product?.colorHex || '#000000',
        description: product?.description || '',
        label: product?.label || '',
        price: product?.price || 0,
        priceBeforeOff: product?.priceBeforeOff || 0,
        slug: product?.slug || '',
    })

    const [file, setFile] = useState<File | null>(null) // Estado para el archivo

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        if (e.target.type === 'file') {
            const target = e.target as HTMLInputElement
            if (target.files && target.files[0]) {
                setFile(target.files[0])
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formDataToSend = new FormData()
        // Añadir campos del formulario al FormData
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value as string)
        })

        // Añadir archivo al FormData
        if (file) {
            formDataToSend.append('image', file)
        }

        const result = await createOrUpdateProduct(product, formDataToSend)

        if (onProductCreatedOrUpdated) onProductCreatedOrUpdated(result)
    }

    return (
        <form
            onSubmit={submit}
            className="px-2">
            <div
                className="h-[78dvh] space-y-8 px-2 overflow-y-auto"
                style={{ scrollbarWidth: 'none' }}>
                <fieldset>
                    <Label
                        htmlFor="name"
                        className="flex items-center gap-1 mb-4">
                        Nombre{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        required
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </fieldset>
                <fieldset>
                    <Label
                        htmlFor="label"
                        className="flex items-center gap-1 mb-4">
                        Etiqueta{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="label"
                        name="label"
                        required
                        type="text"
                        value={formData.label}
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="priceBeforeOff"
                        className="flex items-center gap-1 mb-4">
                        Precio antes de la oferta{' '}
                    </Label>
                    <Input
                        id="priceBeforeOff"
                        name="priceBeforeOff"
                        min="0"
                        type="number"
                        value={formData.priceBeforeOff}
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="price"
                        className="flex items-center gap-1 mb-4">
                        Precio{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="price"
                        name="price"
                        required
                        min="0"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="colorName"
                        className="flex items-center gap-1 mb-4">
                        Color{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="colorName"
                        name="colorName"
                        required
                        type="text"
                        value={formData.colorName}
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="colorHex"
                        className="flex items-center gap-1 mb-4">
                        Color Hex{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="colorHex"
                        name="colorHex"
                        required
                        type="color"
                        value={formData.colorHex}
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="slug"
                        className="flex items-center gap-1 mb-4">
                        Slug{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="slug"
                        name="slug"
                        required
                        type="text"
                        value={formData.slug}
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="description"
                        className="flex items-center gap-1 mb-4">
                        Descripción{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        rows={8}
                        value={formData.description}
                        onChange={handleChange}
                    />
                </fieldset>

                {!product && (
                    <fieldset>
                        <Label
                            htmlFor="image"
                            className="flex items-center gap-1 mb-4">
                            Foto principal (.webp){' '}
                            <Asterisk
                                className={product ? 'hidden' : 'inline-block'}
                                size={12}
                                strokeWidth={1}
                            />
                        </Label>
                        <Input
                            id="image"
                            name="image"
                            accept="image/webp"
                            required={product ? undefined : true}
                            type="file"
                            onChange={handleChange}
                        />
                    </fieldset>
                )}
            </div>

            <Mouse
                className="relative mx-auto mb-1"
                size={16}
            />

            <Button
                type="submit"
                className="w-full">
                Guardar
            </Button>
        </form>
    )
}
