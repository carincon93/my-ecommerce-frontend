import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { uploadPaymentsImageEcommerce } from '@/services/ecommerceService'
import type { Ecommerce } from '@/lib/types'
import { Asterisk } from 'lucide-react'

import { useState, type FormEvent } from 'react'

interface PaymentsImageFormProps {
    ecommerceData?: Ecommerce
    onPaymentsImageUploaded: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

export default function PaymentsImageForm({ onPaymentsImageUploaded, ecommerceData }: PaymentsImageFormProps) {
    const [newImage, setNewImage] = useState<File>()

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newImage) {
            console.error('Please select a image to upload.')
            return
        }

        const formData = new FormData(e.target as HTMLFormElement)
        formData.append('payments-image', newImage)

        const result = await uploadPaymentsImageEcommerce(ecommerceData, formData)
        onPaymentsImageUploaded(result)
    }

    return (
        <form
            onSubmit={submit}
            className="space-y-8">
            <fieldset>
                <Label
                    htmlFor="payments-image-color"
                    className="flex items-center gap-1 mb-4">
                    Esquema de color{' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Select
                    name="payments-image-color"
                    required>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione el esquema de color" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="dark">Oscuro</SelectItem>

                            <SelectItem value="light">Claro</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </fieldset>
            <fieldset>
                <Label
                    htmlFor="payments-image"
                    className="flex items-center gap-1 mb-4">
                    Imagen de los métodos de pago (.webp){' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Input
                    id="payments-image"
                    type="file"
                    accept="image/webp"
                    onChange={(e) => (e.target.files ? setNewImage(e.target.files[0]) : null)}
                    required
                />
            </fieldset>

            <Button
                type="submit"
                className="w-full mt-4 !mx-0">
                Guardar
            </Button>
        </form>
    )
}
