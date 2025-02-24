import ProductCard from '@/components/ProductCard'
import { Badge } from '@/components/ui/badge'

import type { Product } from '@/lib/types'
import { useEffect, useState } from 'react'
import { fetchProductsData } from '@/services/productService'

interface ProductsListProps {
    category: string | undefined
}

export default function ProductsList({ category }: ProductsListProps) {
    const [products, setProducts] = useState<Product[]>([])

    const getProducts = async () => {
        const data = await fetchProductsData()
        setProducts(data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const categoryTitle = category?.replaceAll('-', ' ').toLowerCase()
    const productsFiltered = products.filter((product) => product.categories?.find((categoryItem) => categoryItem.category.title.toLowerCase() === categoryTitle))

    return (
        <ul className={`${productsFiltered.length > 0 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : ''} products-wrapper`}>
            {productsFiltered?.length > 0 ? (
                productsFiltered.map((product, index) => (
                    <li
                        className="h-[600px] sm:h-[450px] lg:h-[500px] 2xl:h-[750px] overflow-hidden"
                        key={index}>
                        <ProductCard
                            product={product}
                            badge={
                                <>
                                    {category && ['nuevo', 'destacado', 'ofertas'].includes(category?.toLowerCase()) && (
                                        <Badge
                                            variant="default"
                                            className={`capitalize text-white absolute top-2 right-2 ${category.toLowerCase() === 'ofertas' ? 'bg-sky-500' : 'bg-amber-500'}`}
                                            style={{ viewTransitionName: 'oferta-box' }}>
                                            {category}
                                        </Badge>
                                    )}
                                </>
                            }
                        />
                    </li>
                ))
            ) : (
                <li className="text-center text-gray-500">No hay productos para mostrar</li>
            )}
        </ul>
    )
}
