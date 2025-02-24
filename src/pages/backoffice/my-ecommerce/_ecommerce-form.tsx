import { useState, type FormEvent } from 'react'
import { type ChangeEvent } from 'react'

import type { Ecommerce } from '@/lib/types'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Asterisk, Mouse } from 'lucide-react'
import { createOrUpdateEcommerce } from '@/services/ecommerceService'

interface EcommerceFormProps {
    ecommerceData: Ecommerce | undefined
    onEcommerceCreatedOrUpdated: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

export default function EcommerceForm({ ecommerceData, onEcommerceCreatedOrUpdated }: EcommerceFormProps) {
    const [formData, setFormData] = useState<Partial<Ecommerce>>({
        name: ecommerceData?.name || '',
        email: ecommerceData?.email || '',
        instagram: ecommerceData?.instagram || '',
        tiktok: ecommerceData?.tiktok || '',
        facebook: ecommerceData?.facebook || '',
        whatsapp: ecommerceData?.whatsapp || '',
        address: ecommerceData?.address || '',
        googleMapsUrl: ecommerceData?.googleMapsUrl || '',
        shipping: ecommerceData?.shipping || 0,
        freeShippingFrom: ecommerceData?.freeShippingFrom || 0,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = await createOrUpdateEcommerce(ecommerceData, formData)
        onEcommerceCreatedOrUpdated(result)
    }

    return (
        <form onSubmit={submit}>
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
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="email"
                        className="flex items-center gap-1 mb-4">
                        Correo electrónico{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="instagram"
                        className="flex items-center gap-1 mb-4">
                        Instagram{' '}
                    </Label>
                    <Input
                        id="instagram"
                        name="instagram"
                        type="text"
                        value={formData.instagram}
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="tiktok"
                        className="flex items-center gap-1 mb-4">
                        TikTok{' '}
                    </Label>
                    <Input
                        id="tiktok"
                        name="tiktok"
                        type="text"
                        value={formData.tiktok}
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="facebook"
                        className="flex items-center gap-1 mb-4">
                        Facebook{' '}
                    </Label>
                    <Input
                        id="facebook"
                        name="facebook"
                        type="text"
                        value={formData.facebook}
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="whatsapp"
                        className="flex items-center gap-1 mb-4">
                        Whatsapp{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="whatsapp"
                        name="whatsapp"
                        type="number"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="address"
                        className="flex items-center gap-1 mb-4">
                        Dirección{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="googleMapsUrl"
                        className="flex items-center gap-1 mb-4">
                        URL de Google Maps{' '}
                    </Label>
                    <Input
                        id="googleMapsUrl"
                        name="googleMapsUrl"
                        type="text"
                        value={formData.googleMapsUrl}
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="shipping"
                        className="flex items-center gap-1 mb-4">
                        Valor del envío{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="shipping"
                        name="shipping"
                        type="number"
                        min="0"
                        required
                        value={formData.shipping}
                        onChange={handleChange}
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="freeShippingFrom"
                        className="flex items-center gap-1 mb-4">
                        Envío gratis a partir de:{' '}
                    </Label>
                    <Input
                        id="freeShippingFrom"
                        name="freeShippingFrom"
                        type="number"
                        min="0"
                        value={formData.freeShippingFrom}
                        onChange={handleChange}
                    />
                </fieldset>
            </div>

            <Mouse className="top-5 relative mx-auto mb-2" size={16} />

            <Button
                type="submit"
                className="w-full">
                Guardar
            </Button>
        </form>
    )
}
