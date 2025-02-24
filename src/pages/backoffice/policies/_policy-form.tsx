import type { Policy } from '@/lib/types'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { Asterisk } from 'lucide-react'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { createOrUpdatePolicy } from '@/services/policyService'

interface PolicyFormProps {
    policy?: Policy
    onPolicyCreatedOrUpdated?: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

export default function PolicyForm({ policy, onPolicyCreatedOrUpdated }: PolicyFormProps) {
    const [formData, setFormData] = useState<Partial<Policy>>({
        title: policy?.title || '',
        content: policy?.content || '',
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

        const result = await createOrUpdatePolicy(policy, formData)
        if (onPolicyCreatedOrUpdated) onPolicyCreatedOrUpdated(result)
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
                    htmlFor="content"
                    className="flex items-center gap-1 mb-4">
                    Contenido{' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>
                <Textarea
                    id="content"
                    name="content"
                    rows={16}
                    value={formData.content}
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
