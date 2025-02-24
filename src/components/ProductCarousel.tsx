import ProductCard from '@/components/ProductCard'
import ProductSheet from '@/components/ProductSheet'
import ShoppingCartButtons from '@/components/ShoppingCartButtons'
import Cart from '@/components/Cart'
import { Button } from '@/components/ui/button'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { Product } from '@/lib/types'
import { fetchProductsData } from '@/services/productService'

import { useEffect, useMemo, useRef, useState } from 'react'

interface ProductCarouselProps {
    category: string
}

export default function ProductCarousel({ category }: ProductCarouselProps) {
    const [currentTranslation, setCurrentTranslation] = useState(0)
    const [products, setProducts] = useState<Product[]>([])
    const [widthSize, setWidthSize] = useState<number>(0)
    const [returnState, setReturnState] = useState<boolean>(false)
    const [sheetState, setSheetState] = useState<boolean>(false)
    const [productSelected, setProductSelected] = useState<Product | null>(null)

    const carouselRef = useRef<HTMLDivElement | null>(null)

    // Función para calcular la cantidad de elementos visibles en el carrusel
    const getTranslateValueByWidth = (width: number) => {
        if (width <= 752) return 100
        if (width <= 1024) return 50
        if (width <= 1279) return 33.33
        return 25
    }

    // Memoiza los valores para evitar cálculos innecesarios
    const translateValueByWindowWidth = useMemo(() => getTranslateValueByWidth(widthSize), [widthSize])
    const itemsCarouselToShow = useMemo(() => Math.round(100 / translateValueByWindowWidth), [translateValueByWindowWidth])

    // Función para avanzar en el carrusel
    const handleNext = () => {
        if (!carouselRef.current) return

        setCurrentTranslation((prevTranslation) => prevTranslation - translateValueByWindowWidth)
    }

    // Función para retroceder en el carrusel
    const handlePrevious = () => {
        if (!carouselRef.current) return

        setCurrentTranslation((prevTranslation) => prevTranslation + translateValueByWindowWidth)
    }

    // Obtener productos
    const getProducts = async () => {
        const data = await fetchProductsData()
        setProducts(data)
    }

    // Manejo de resize
    useEffect(() => {
        const updateSize = () => {
            if (carouselRef.current) {
                setCurrentTranslation(0)
                setWidthSize(carouselRef.current.offsetWidth + 80)
            }
        }

        updateSize()
        window.addEventListener('resize', updateSize)
        getProducts()

        return () => window.removeEventListener('resize', updateSize)
    }, [])

    const productsFiltered = useMemo(() => products.filter((product) => product.categories?.some((categoryItem) => categoryItem.category.name.toLowerCase() === category)), [products, category])

    const isLastSlide = useMemo(
        () => -currentTranslation >= (productsFiltered.length - itemsCarouselToShow) * translateValueByWindowWidth,
        [currentTranslation, productsFiltered.length, itemsCarouselToShow, translateValueByWindowWidth],
    )

    return (
        <>
            <div className="group/carousel relative">
                {/* Carousel Content */}
                <div
                    className="transition-transform duration-300 h-[500px] sm:h-[650px] md:h-[500px] lg:h-[500px] 2xl:h-[750px] carousel-wrapper"
                    ref={carouselRef}
                    style={{
                        transform: `translateX(${currentTranslation}%)`,
                        willChange: 'transform',
                    }}>
                    {productsFiltered?.length > 0 ? (
                        productsFiltered.map((product, index) => (
                            <div
                                key={product.id || index} // Utiliza un identificador único si está disponible
                                className="absolute block h-[inherit] px-[15px] w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                                style={{ transform: `translateX(${index * 100}%)` }}>
                                <ProductCard product={product} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No hay productos para mostrar</p>
                    )}
                </div>

                {/* Navigation Buttons */}
                <button
                    type="button"
                    className={`${
                        currentTranslation === 0 ? 'opacity-0' : 'opacity-100 xl:opacity-0 group-hover/carousel:opacity-100'
                    } absolute top-1/2 left-0 bg-white text-black size-10 flex items-center justify-center rounded-full shadow-lg transition-opacity ease-in-out duration-300`}
                    onClick={handlePrevious}
                    disabled={currentTranslation === 0}>
                    <ChevronLeft />
                </button>

                <button
                    type="button"
                    className={`${
                        isLastSlide ? 'opacity-0' : 'opacity-100 xl:opacity-0 group-hover/carousel:opacity-100'
                    } absolute top-1/2 right-0 bg-white text-black size-10 flex items-center justify-center rounded-full shadow-lg transition-opacity ease-in-out duration-300`}
                    onClick={handleNext}
                    disabled={isLastSlide}>
                    <ChevronRight />
                </button>
            </div>
        </>
    )
}
