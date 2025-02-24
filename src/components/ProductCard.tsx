import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ProductSheet from '@/components/ProductSheet'
import ShoppingCartButtons from '@/components/ShoppingCartButtons'
import Cart from '@/components/Cart'

import type { Product, ProductVariant } from '@/lib/types'
import { PRODUCTS_FOLDER, URL_BACKEND_UPLOADS } from 'astro:env/client'
import { useState } from 'react'

interface ProductItemProps {
    divRef?: React.RefObject<HTMLDivElement | null>
    product: Product
    badge?: React.ReactNode
}

export default function ProductCard({ divRef, product, badge }: ProductItemProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [cartHasItems, setCartHasItems] = useState<boolean>(false)

    return (
        <Card
            className="bg-[#f8f8ff] dark:bg-black border border-gray-400 rounded-t-xl shadow-none h-full"
            ref={divRef}>
            <CardContent
                className="border-0 flex flex-col p-0 size-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <div className="h-[65%] lg:h-[60%] relative">
                    <a
                        href={`/products/${product?.slug}`}
                        className="h-full block overflow-hidden rounded-t-xl"
                        style={{
                            ...(isHovered && { viewTransitionName: `products-${product?.slug}-box` }),
                        }}>
                        {product?.photos && product?.photos.length > 0 && (
                            <img
                                src={`${URL_BACKEND_UPLOADS + PRODUCTS_FOLDER + product?.photos[0].image}`}
                                className="size-full object-cover transition-transform duration-300 transform hover:scale-110 peer [-webkit-mask-image:linear-gradient(black_85%,transparent)]"
                                alt=""
                            />
                        )}
                    </a>
                    {badge}
                </div>

                <div className="h-[35%] p-4 flex flex-col justify-between">
                    <small
                        className="text-[10px] sm:text-[10px] tracking-wider text-gray-600"
                        style={{
                            ...(isHovered && { viewTransitionName: `products-${product?.slug}-label` }),
                        }}>
                        {product?.label}
                    </small>
                    <div className="flex items-center gap-2">
                        <small className="text-black/60 dark:text-white">Colores disponibles:</small>
                        <figure
                            className="size-3 rounded-full border border-black"
                            style={{ backgroundColor: product.colorHex }}></figure>
                        {product.variants &&
                            product.variants.map((productVariant: ProductVariant) => (
                                <figure
                                    key={productVariant.id}
                                    className="size-3 rounded-full border border-black"
                                    style={{ backgroundColor: productVariant.mainProduct.colorHex }}></figure>
                            ))}
                    </div>

                    <div className="flex items-center lg:my-4">
                        <a href={`/products/${product?.slug}`}>
                            <h1
                                className="h-[40px] 2xl:h-[60px] uppercase text-xs md:text-md 2xl:text-lg line-clamp-2 overflow-hidden"
                                style={{
                                    ...(isHovered && { viewTransitionName: `products-${product?.slug}-title` }),
                                }}>
                                {product?.name}
                            </h1>
                        </a>
                    </div>

                    <span
                        className="tracking-wider lg:mb-2"
                        style={{
                            ...(isHovered && { viewTransitionName: `products-${product?.slug}-price` }),
                        }}>
                        ${product?.price.toLocaleString('es-CO')},00 COP
                    </span>

                    <ProductSheet
                        sheetId={`product-card-${product.id}`}
                        sheetTrigger={
                            <Button
                                type="button"
                                className="w-full">
                                Elegir opciones
                            </Button>
                        }
                        sheetTitle="Seleccione opciones"
                        sheetDescription={product?.description}
                        classNameIdentifier="sheet-dialog"
                        product={product}>
                        {product && (
                            <ShoppingCartButtons
                                product={product}
                                checkIfCartHasItems={setCartHasItems}
                            />
                        )}
                        {cartHasItems && (
                            <ProductSheet
                                sheetId={`cart-${product.id}`}
                                sheetTrigger={
                                    <Button
                                        type="button"
                                        className="w-full mt-2 uppercase">
                                        Finalizar compra
                                    </Button>
                                }
                                sheetTitle="Mi carrito de compras"
                                sheetDescription=""
                                classNameIdentifier="cart-dialog">
                                <Cart classNameIdentifier="sheet-dialog" />
                            </ProductSheet>
                        )}
                    </ProductSheet>
                </div>
            </CardContent>
        </Card>
    )
}
