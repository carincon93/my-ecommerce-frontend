import type { Category } from '@/lib/types'
import { fetchWithAuth } from '@/lib/utils'
import { URL_BACKEND } from 'astro:env/client'

export async function fetchCategoriesData(): Promise<{ ok: boolean; data?: Category[]; success?: string; error?: string }> {
    return await fetchWithAuth<Category[]>(`${URL_BACKEND}/category`, 'GET')
}

// Función para actualizar o crear una categoría
export const createOrUpdateCategory = async (category: Category | undefined, formData: Partial<Category>): Promise<{ ok: boolean; data?: Category; success?: string; error?: string }> => {
    const isEdit = Boolean(category?.id) // Determina si es POST o PATCH
    const url = isEdit ? `${URL_BACKEND}/category/${category?.id}` : `${URL_BACKEND}/category`

    return await fetchWithAuth<Category>(url, isEdit ? 'PATCH' : 'POST', formData)
}

// Función para eliminar una categoría
export const deleteCategory = async (category: Category): Promise<{ ok: boolean; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/category/${category.id}`
    return await fetchWithAuth<Category>(url, 'DELETE')
}
