import type { Category, Product } from '@/lib/types'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Asterisk } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { createOrUpdateCategory } from '@/services/categoryService'

interface CategoryFormProps {
    category?: Category
    onCategoryCreatedOrUpdated?: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

export default function CategoryForm({ category, onCategoryCreatedOrUpdated }: CategoryFormProps) {
    const [formData, setFormData] = useState<Partial<Category>>({
        title: category?.title || '',
        name: category?.name || '',
        isMenuVisible: category?.isMenuVisible ?? true,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleRadioChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            isMenuVisible: value === 'true', // Convertir string a booleano
        }))
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = await createOrUpdateCategory(category, formData)

        if (onCategoryCreatedOrUpdated) onCategoryCreatedOrUpdated(result)
    }

    return (
        <form
            onSubmit={submit}
            className="space-y-8">
            <fieldset>
                <Label
                    htmlFor="title"
                    className="flex items-center gap-1 mb-4">
                    Título{' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </fieldset>
            <fieldset>
                <Label
                    htmlFor="name"
                    className="flex items-center gap-1 mb-4">
                    Nombre corto{' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </fieldset>

            <fieldset>
                <Label className="mb-4 block">¿Es visible en el menú?</Label>
                <RadioGroup
                    defaultValue={formData.isMenuVisible ? 'true' : 'false'}
                    onValueChange={handleRadioChange}
                    className="flex flex-col gap-2">
                    <Label
                        htmlFor="visible-true"
                        className="flex items-center gap-2">
                        <RadioGroupItem
                            id="visible-true"
                            value="true"
                            checked={formData.isMenuVisible === true}
                        />
                        Sí
                    </Label>
                    <Label
                        htmlFor="visible-false"
                        className="flex items-center gap-2">
                        <RadioGroupItem
                            id="visible-false"
                            value="false"
                            checked={formData.isMenuVisible === false}
                        />
                        No
                    </Label>
                </RadioGroup>
            </fieldset>

            <Button
                type="submit"
                className="w-full mt-4">
                Guardar
            </Button>
        </form>
    )
}
