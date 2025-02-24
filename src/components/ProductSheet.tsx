import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetClose, SheetTrigger } from '@/components/ui/sheet'
import ImageCarousel from '@/components/ImageCarousel'

import { X } from 'lucide-react'

import type { Product } from '@/lib/types'
import { fetchProductsData } from '@/services/productService'

import { URL_BACKEND_UPLOADS, PRODUCTS_FOLDER } from 'astro:env/client'
import { useEffect, useState } from 'react'
import { useStore } from '@nanostores/react'
import { sheetStates, openSheet, closeSheet } from '@/stores/cartStore'

interface ProductSheetProps {
    sheetTrigger?: React.ReactNode
    sheetTitle?: string
    sheetDescription?: string
    classNameIdentifier?: string
    product?: Product | null
    children?: React.ReactNode
    setProductSelected?: React.Dispatch<React.SetStateAction<Product | null>>
    sheetId: string
}

export default function ProductSheet({ sheetTrigger = 'Open', sheetId, sheetTitle = '', sheetDescription = '', classNameIdentifier, product, children, setProductSelected }: ProductSheetProps) {
    const [hideAsideProductList, setHideAsideProductList] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const isOpen = useStore(sheetStates)[sheetId] || false

    const handleClick = () => {
        setHideAsideProductList(true)

        setTimeout(() => {
            if (setProductSelected) setProductSelected(null)
            setHideAsideProductList(false)
        }, 500)
    }

    const getProducts = async () => {
        const data = await fetchProductsData()
        setProducts(data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Sheet
            open={isOpen}
            onOpenChange={(state) => (state ? openSheet(sheetId) : closeSheet(sheetId))}>
            <SheetTrigger asChild>{sheetTrigger}</SheetTrigger>

            <SheetContent
                className={`w-full md:w-[29rem] p-0 overflow-x-hidden lg:overflow-x-visible overflow-y-auto lg:overflow-y-visible group ${classNameIdentifier ?? ''}`}
                style={{ scrollbarWidth: 'none' }}>
                <SheetHeader className="sticky top-0 inset-0 h-20 flex-row items-center shadow-md px-3 z-10">
                    <SheetTitle className="text-left flex-1 uppercase leading-5">{sheetTitle}</SheetTitle>
                    <SheetClose
                        className="mx-2"
                        onClick={() => {
                            handleClick()
                        }}
                        autoFocus={false}>
                        <X className="mb-2" />
                    </SheetClose>
                </SheetHeader>

                <div className="h-full z-10 flex flex-col">
                    <div className="lg:hidden relative [.sheet-dialog_&]:h-[50dvh]">{product?.photos && <ImageCarousel images={product.photos} />}</div>

                    {product?.name && <h1 className="p-4 text-3xl">{product?.name}</h1>}

                    <SheetDescription className="whitespace-pre-line p-4 text-black">
                        {sheetDescription && (
                            <>
                                {product && <span className="block text-2xl">${product?.price.toLocaleString('es-CO')},00</span>}
                                <small className="mt-2 text-gray-400 block text-[12px]">Impuesto incluido. Los gastos de envío se calculan en la pantalla de pago.</small>
                                {/* {sheetDescription} */}
                            </>
                        )}
                    </SheetDescription>

                    <div className="px-4 [.sheet-dialog_&]:h-[20dvh] h-full [.sheet-dialog_&]:mt-4">
                        {product && product?.photos && setProductSelected && product.variants && product.variants?.length > 0 && (
                            <>
                                <strong>Color:</strong> {product?.colorName}
                                <div className="flex space-x-2 my-4">
                                    <div className="hover:opacity-80 border border-black p-4">
                                        <figure
                                            className="size-3 rounded-full border border-black"
                                            style={{ backgroundColor: product.colorHex }}></figure>
                                    </div>
                                    {product.variants?.map((variant, index) => (
                                        <button
                                            key={index}
                                            className="hover:opacity-80 border border-gray-100 p-4"
                                            onClick={() => {
                                                const variantSelected: Product | null = products?.find((item) => item.id === variant?.mainProduct.id) || null
                                                setProductSelected(variantSelected)
                                            }}>
                                            {variant?.mainProduct && (
                                                <figure
                                                    className="size-3 rounded-full border border-black"
                                                    style={{ backgroundColor: variant.mainProduct.colorHex }}></figure>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                        {children}
                    </div>
                </div>

                {product && (
                    <div
                        className={`hidden md:block product-quick-images sm:max-w-[24rem] -z-10 absolute top-0 bg-white/90 dark:bg-black/90 backdrop-blur-md ${
                            hideAsideProductList ? 'translate-x-[100%]' : '-translate-x-[100%]'
                        } h-full transition delay-150 duration-300 ease-in-out overflow-y-auto`}
                        style={{ scrollbarWidth: 'none' }}>
                        {product.photos && product.photos?.length > 0 && (
                            <>
                                {product.photos
                                    .filter((pohoto) => pohoto.isSizeGuide !== true)
                                    ?.map((item, index) => (
                                        <picture key={index}>
                                            <img
                                                src={`${URL_BACKEND_UPLOADS + PRODUCTS_FOLDER + item?.image}`}
                                                alt={`Variant ${index}`}
                                            />
                                        </picture>
                                    ))}
                            </>
                        )}
                        {product.variants &&
                            product.variants?.length > 0 &&
                            product.variants.map((variant, index) =>
                                variant?.mainProduct.photos?.[0]?.image ? (
                                    <picture key={index}>
                                        <img
                                            src={`${URL_BACKEND_UPLOADS + PRODUCTS_FOLDER + variant.mainProduct.photos[0].image}`}
                                            alt={`Variant ${index}`}
                                        />
                                    </picture>
                                ) : null,
                            )}
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
