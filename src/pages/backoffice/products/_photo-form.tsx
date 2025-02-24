import type { Photo, Product } from '@/lib/types'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Asterisk } from 'lucide-react'
import { uploadPhotoProduct } from '@/services/productService'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface PhotoFormProps {
    product: Product
    setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>
    onPhotoUploaded: (result: { ok: boolean; success?: string | undefined; error?: string | undefined }) => Promise<void>
}

export default function PhotoForm({ product, onPhotoUploaded, setPhotos }: PhotoFormProps) {
    const [newPhoto, setNewPhoto] = useState<File>()
    const [isSizeGuide, setIsSizeGuide] = useState<string>('false')

    const handleRadioChange = (value: string) => {
        setIsSizeGuide(value)
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!newPhoto) {
            console.error('Please select a photo to upload.')
            return
        }

        const formData = new FormData(e.target as HTMLFormElement)
        formData.append('image', newPhoto)
        formData.append('isSizeGuide', isSizeGuide)

        const result = await uploadPhotoProduct(product, formData)

        if (onPhotoUploaded) onPhotoUploaded(result)

        if (result.data) {
            setPhotos((prevPhotos) => [...prevPhotos, result.data as Photo])
        }
    }

    return (
        <form
            onSubmit={submit}
            className="space-y-8 py-4">
            <fieldset>
                <Label
                    htmlFor="image"
                    className="flex items-center gap-1 mb-4">
                    Foto (.webp){' '}
                    <Asterisk
                        size={12}
                        strokeWidth={1}
                    />
                </Label>

                <Input
                    id="image"
                    type="file"
                    accept="image/webp"
                    onChange={(e) => (e.target.files ? setNewPhoto(e.target.files[0]) : null)}
                />
            </fieldset>

            <fieldset>
                <Label className="mb-4 block">¿Es una imagen sobre las tallas?</Label>
                <RadioGroup
                    onValueChange={handleRadioChange}
                    className="flex flex-col gap-2">
                    <Label
                        htmlFor="visible-true"
                        className="flex items-center gap-2">
                        <RadioGroupItem
                            id="visible-true"
                            value="true"
                            checked={isSizeGuide === 'true'}
                        />
                        Sí
                    </Label>
                    <Label
                        htmlFor="visible-false"
                        className="flex items-center gap-2">
                        <RadioGroupItem
                            id="visible-false"
                            value="false"
                            checked={isSizeGuide === 'false'}
                        />
                        No
                    </Label>
                </RadioGroup>
            </fieldset>

            <Button
                type="submit"
                className="w-full">
                Guardar
            </Button>
        </form>
    )
}
