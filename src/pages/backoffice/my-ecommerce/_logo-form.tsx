import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Asterisk } from 'lucide-react'
import type { Ecommerce } from '@/lib/types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { uploadLogoEcommerce } from '@/services/ecommerceService'

interface LogoFormProps {
    ecommerceData?: Ecommerce
    onLogoUploaded: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

export default function LogoForm({ onLogoUploaded, ecommerceData }: LogoFormProps) {
    const [newLogo, setNewLogo] = useState<File>()

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newLogo) {
            console.error('Please select a logo to upload.')
            return
        }

        const formData = new FormData(e.target as HTMLFormElement)
        formData.append('logo', newLogo)

        const result = await uploadLogoEcommerce(ecommerceData, formData)
        onLogoUploaded(result)
    }

    return (
        <form
            onSubmit={submit}
            className="space-y-8">
            <fieldset>
                <Label
                    htmlFor="logoColor"
                    className="flex items-center gap-1 mb-4">
                    Esquema de color{' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Select
                    name="logoColor"
                    required>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione el color del logo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="dark">Logo oscuro</SelectItem>

                            <SelectItem value="light">Logo claro</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </fieldset>
            <fieldset>
                <Label
                    htmlFor="image"
                    className="flex items-center gap-1 mb-4">
                    Logo (.svg){' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/svg+xml"
                    onChange={(e) => (e.target.files ? setNewLogo(e.target.files[0]) : null)}
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
