import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { FormEvent } from 'react'
import { Asterisk } from 'lucide-react'
import type { Ecommerce } from '@/lib/types'
import { uploadImageEcommerce } from '@/services/ecommerceService'

interface ImageFormProps {
    ecommerceData?: Ecommerce
    onImageUploaded: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

export default function ImageForm({ onImageUploaded, ecommerceData }: ImageFormProps) {
    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const result = await uploadImageEcommerce(ecommerceData, formData)
        onImageUploaded(result)
    }

    return (
        <form onSubmit={submit}>
            <fieldset>
                <Label
                    htmlFor="image"
                    className="flex items-center gap-1 mb-4">
                    Imagen principal (.webp){' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/webp"
                    name="image"
                    required
                />
            </fieldset>

            <Button
                type="submit"
                className="w-full mt-4 !mx-0">
                {ecommerceData?.image != '' ? 'Reemplazar' : 'Guardar'}
            </Button>
        </form>
    )
}
