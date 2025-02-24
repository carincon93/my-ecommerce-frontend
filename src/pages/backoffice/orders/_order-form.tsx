import type { Order } from '@/lib/types'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { Asterisk } from 'lucide-react'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { createOrUpdateOrder } from '@/services/orderService'

interface OrderFormProps {
    order?: Order
    onOrderCreatedOrUpdated?: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

export default function OrderForm({ order, onOrderCreatedOrUpdated }: OrderFormProps) {
    const [formData, setFormData] = useState<Partial<Order>>({
        id: order?.id || '',
        trackingCompany: order?.trackingCompany || '',
        trackingNumber: order?.trackingNumber || '',
        trackingUrl: order?.trackingUrl || '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = await createOrUpdateOrder(order, formData)
        if (onOrderCreatedOrUpdated) onOrderCreatedOrUpdated(result)
    }

    return (
        <form
            onSubmit={submit}
            className="space-y-8">
            <fieldset>
                <Label
                    htmlFor="trackingCompany"
                    className="flex items-center gap-1 mb-4">
                    Compañía de envíos{' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Input
                    id="trackingCompany"
                    name="trackingCompany"
                    type="text"
                    value={formData?.trackingCompany}
                    onChange={handleChange}
                    required
                />
            </fieldset>

            <fieldset>
                <Label
                    htmlFor="trackingNumber"
                    className="flex items-center gap-1 mb-4">
                    Número de guía{' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Input
                    id="trackingNumber"
                    name="trackingNumber"
                    type="text"
                    value={formData?.trackingNumber}
                    onChange={handleChange}
                    required
                />
            </fieldset>

            <fieldset>
                <Label
                    htmlFor="trackingUrl"
                    className="flex items-center gap-1 mb-4">
                    Url de la guía{' '}
                </Label>
                <Input
                    id="trackingUrl"
                    name="trackingUrl"
                    type="url"
                    value={formData?.trackingUrl}
                    onChange={handleChange}
                />
            </fieldset>

            <Button
                type="submit"
                className="w-full mt-4">
                Guardar
            </Button>
        </form>
    )
}
