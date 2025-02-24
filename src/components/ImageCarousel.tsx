import { Card, CardContent } from '@/components/ui/card'
import type { Photo } from '@/lib/types'
import { PRODUCTS_FOLDER, URL_BACKEND, URL_BACKEND_UPLOADS } from 'astro:env/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'

interface ImageCarouselProps {
    images: Photo[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    const [currentTranslation, setCurrentTranslation] = useState(0)
    const carouselRef = useRef<HTMLDivElement | null>(null)

    // Función para avanzar en el carrusel
    const handleNext = () => {
        if (!carouselRef.current) return

        setCurrentTranslation((prevTranslation) => {
            const nextTranslation = prevTranslation - 100
            return nextTranslation
        })
    }

    // Función para retroceder en el carrusel
    const handlePrevious = () => {
        if (!carouselRef.current) return

        setCurrentTranslation((prevTranslation) => {
            const nextTranslation = prevTranslation + 100
            return nextTranslation
        })
    }

    const imagesFiltered = images.filter((image) => image.isSizeGuide === false)

    return (
        <div className="group/carousel relative h-[inherit]">
            {/* Carousel Content */}
            <div
                className="transition-transform duration-300 h-[inherit]"
                ref={carouselRef}
                style={{
                    transform: `translateX(${currentTranslation}%)`,
                    willChange: 'transform',
                }}>
                {imagesFiltered.map((item, index) => (
                    <div
                        key={index}
                        className="absolute block w-full h-[inherit]"
                        style={{ transform: `translateX(${index * 100}%)` }}>
                        <Card className="border-0 shadow-none h-full">
                            <CardContent className="border-0 flex flex-col p-0 aspect-square size-full">
                                <picture className="aspect-square block size-full">
                                    <img
                                        src={`${URL_BACKEND_UPLOADS + PRODUCTS_FOLDER + item.image}`}
                                        className="object-cover size-full animate-blur-fade-out"
                                        alt=""
                                    />
                                </picture>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                type="button"
                title=""
                className={`${
                    currentTranslation === 0 ? 'opacity-0' : 'opacity-100 xl:opacity-0 group-hover/carousel:opacity-100'
                } absolute top-1/2 left-2 bg-white text-black size-10 flex items-center justify-center rounded-full shadow-lg transition-opacity ease-in-out duration-300`}
                onClick={handlePrevious}
                disabled={currentTranslation === 0}>
                <ChevronLeft />
            </button>

            <button
                type="button"
                title=""
                className={`${
                    -currentTranslation === (imagesFiltered.length - 1) * 100 ? 'opacity-0' : 'opacity-100 xl:opacity-0 group-hover/carousel:opacity-100'
                } absolute top-1/2 right-2 bg-white text-black size-10 flex items-center justify-center rounded-full shadow-lg transition-opacity ease-in-out duration-300`}
                onClick={handleNext}
                disabled={-currentTranslation === (imagesFiltered.length - 1) * 100}>
                <ChevronRight />
            </button>
        </div>
    )
}
