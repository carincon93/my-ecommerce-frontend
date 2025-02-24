import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Asterisk } from 'lucide-react'
import type { Ecommerce } from '@/lib/types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { uploadFaviconEcommerce } from '@/services/ecommerceService'

interface FaviconFormProps {
    ecommerceData?: Ecommerce
    onFaviconUploaded: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

export default function FaviconForm({ onFaviconUploaded, ecommerceData }: FaviconFormProps) {
    const [newFavicon, setNewFavicon] = useState<File>()

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newFavicon) {
            console.error('Please select a favicon to upload.')
            return
        }

        const formData = new FormData(e.target as HTMLFormElement)
        formData.append('favicon', newFavicon)

        const result = await uploadFaviconEcommerce(ecommerceData, formData)
        onFaviconUploaded(result)
    }

    return (
        <form
            onSubmit={submit}
            className="space-y-8">
            <fieldset>
                <Label
                    htmlFor="faviconColor"
                    className="flex items-center gap-1 mb-4">
                    Esquema de color{' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Select
                    name="faviconColor"
                    required>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione el color del favicon" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="dark">Favicon oscuro</SelectItem>

                            <SelectItem value="light">Favicon claro</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </fieldset>
            <fieldset>
                <Label
                    htmlFor="image"
                    className="flex items-center gap-1 mb-4">
                    Favicon (.svg){' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/svg+xml"
                    onChange={(e) => (e.target.files ? setNewFavicon(e.target.files[0]) : null)}
                />
            </fieldset>

            <Button
                type="submit"
                className="w-full mt-4 !mx-0">
                {Boolean(ecommerceData?.faviconDark) ? 'Reemplazar' : 'Guardar'}
            </Button>
        </form>
    )
}
