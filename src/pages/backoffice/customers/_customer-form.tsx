import type { Customer } from '@/lib/types'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

import { Asterisk, Mouse } from 'lucide-react'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { createOrUpdateCustomer } from '@/services/customerService'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { dniTypes } from '@/lib/data'

interface CustomerFormProps {
    customer?: Customer
    onCustomerCreatedOrUpdated?: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

export default function CustomerForm({ customer, onCustomerCreatedOrUpdated }: CustomerFormProps) {
    const [formData, setFormData] = useState<Partial<Customer>>({
        name: customer?.name || '',
        lastname: customer?.lastname || '',
        address: customer?.address || '',
        phone: customer?.phone || '',
        email: customer?.email || '',
        country: customer?.country || '',
        city: customer?.city || '',
        state: customer?.state || '',
        dniNumber: customer?.dniNumber || '',
        dniType: customer?.dniType || '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            dniType: value,
        }))
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = await createOrUpdateCustomer(customer, formData)
        if (onCustomerCreatedOrUpdated) onCustomerCreatedOrUpdated(result)
    }

    return (
        <form
            onSubmit={submit}
            className="relative">
            <div
                className="h-[78dvh] space-y-8 px-2 overflow-y-auto"
                style={{ scrollbarWidth: 'none' }}>
                <fieldset>
                    <Label
                        htmlFor="name"
                        className="flex items-center gap-1 mb-4">
                        Nombres{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData?.name}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="lastname"
                        className="flex items-center gap-1 mb-4">
                        Apellidos{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="lastname"
                        name="lastname"
                        type="text"
                        value={formData?.lastname}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                <fieldset className="mb-8">
                    <Label
                        htmlFor="dniType"
                        className="flex items-center gap-1 mb-4">
                        Tipo de documento{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Select
                        name="dniType"
                        required
                        onValueChange={handleSelectChange}
                        defaultValue={formData.dniType}>
                        <SelectTrigger id="dniType">
                            <SelectValue placeholder="Seleccione un tipo de documento" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {dniTypes.map((dniType) => (
                                    <SelectItem
                                        key={dniType.shortName}
                                        value={dniType.shortName}>
                                        {dniType.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="dniNumber"
                        className="flex items-center gap-1 mb-4">
                        Número de documento{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="dniNumber"
                        name="dniNumber"
                        type="number"
                        min="0"
                        value={formData?.dniNumber}
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
                        value={formData?.email}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="address"
                        className="flex items-center gap-1 mb-4">
                        Dirección de residencia{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="address"
                        name="address"
                        type="text"
                        value={formData?.address}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="phone"
                        className="flex items-center gap-1 mb-4">
                        Número de celular{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="text"
                        value={formData?.phone}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="country"
                        className="flex items-center gap-1 mb-4">
                        País{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="country"
                        name="country"
                        type="text"
                        value={formData?.country}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="state"
                        className="flex items-center gap-1 mb-4">
                        Municipio{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="state"
                        name="state"
                        type="text"
                        value={formData?.state}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                <fieldset>
                    <Label
                        htmlFor="city"
                        className="flex items-center gap-1 mb-4">
                        Ciudad{' '}
                        <Asterisk
                            size={12}
                            strokeWidth={1}
                        />
                    </Label>
                    <Input
                        id="city"
                        name="city"
                        type="text"
                        value={formData?.city}
                        onChange={handleChange}
                        required
                    />
                </fieldset>
            </div>

            <Mouse
                className="top-5 relative mx-auto mb-2"
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
