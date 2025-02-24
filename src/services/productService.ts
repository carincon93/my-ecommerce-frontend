import type { Photo, Product, ProductCategory, ProductVariant, Stock } from '@/lib/types'
import { fetchFromAPI, fetchWithAuth } from '@/lib/utils'
import { URL_BACKEND } from 'astro:env/client'

export async function fetchProductsData(): Promise<Product[]> {
    const result = await fetchFromAPI<Product[]>('product', 'GET')
    return result.ok ? result.data || [] : []
}

export async function fetchProductData(id: string): Promise<Product> {
    const result = await fetchFromAPI<Product>(`product/${id}`, 'GET')
    return result.ok ? result.data || ({} as Product) : ({} as Product)
}

// Función para actualizar o crear un producto
export const createOrUpdateProduct = async (product: Product | undefined, formData: FormData | Partial<Product>): Promise<{ ok: boolean; data?: Product; success?: string; error?: string }> => {
    const isEdit = Boolean(product?.id) // Determina si es POST o PATCH
    const url = isEdit ? `${URL_BACKEND}/product/${product?.id}` : `${URL_BACKEND}/product`

    return await fetchWithAuth<Product>(url, isEdit ? 'PATCH' : 'POST', formData)
}

// Función para eliminar un producto
export const deleteProduct = async (product: Product): Promise<{ ok: boolean; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/product/${product.id}`
    return await fetchWithAuth<Product>(url, 'DELETE')
}

// Función para cargar fotos del producto
export const uploadPhotoProduct = async (product: Product, formData: FormData): Promise<{ ok: boolean; data?: Photo; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/product/${product.id}/photo`
    return await fetchWithAuth<Photo>(url, 'POST', formData)
}

// Función para eliminar una foto del producto
export const deletePhotoProduct = async (product: Product, photoSelected: Photo): Promise<{ ok: boolean; data?: Photo; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/product/${product.id}/photo/${photoSelected?.id}`
    return await fetchWithAuth<Photo>(url, 'DELETE')
}

export const linkProductVariant = async (product: Product, formData: Partial<ProductVariant>): Promise<{ ok: boolean; data?: ProductVariant; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/product/${product.id}/product-variant`
    return await fetchWithAuth<ProductVariant>(url, 'POST', formData)
}

export const unlinkProductVariant = async (product: Product, productVariantId: string): Promise<{ ok: boolean; data?: ProductVariant; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/product/${product.id}/product-variant/${productVariantId}`
    return await fetchWithAuth<ProductVariant>(url, 'DELETE')
}

export const linkProductCategory = async (product: Product, formData: Partial<ProductCategory>): Promise<{ ok: boolean; data?: ProductCategory; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/product/${product.id}/product-category`
    return await fetchWithAuth<ProductCategory>(url, 'POST', formData)
}

export const unlinkProductCategory = async (product: Product, productCategoryId: string): Promise<{ ok: boolean; data?: ProductCategory; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/product/${product.id}/product-category/${productCategoryId}`
    return await fetchWithAuth<ProductCategory>(url, 'DELETE')
}

export const createOrUpdateStock = async (product: Product, stockId: string | undefined, formData: Partial<Stock>): Promise<{ ok: boolean; data?: Stock; success?: string; error?: string }> => {
    const isEdit = Boolean(stockId) // Determina si es POST o PATCH
    const url = isEdit ? `${URL_BACKEND}/product/${product?.id}/stock/${stockId}` : `${URL_BACKEND}/product/${product?.id}/stock`

    return await fetchWithAuth<Stock>(url, isEdit ? 'PATCH' : 'POST', formData)
}

export const deleteStock = async (product: Product, stockId: string): Promise<{ ok: boolean; data?: Stock; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/product/${product.id}/stock/${stockId}`
    return await fetchWithAuth<Stock>(url, 'DELETE')
}
