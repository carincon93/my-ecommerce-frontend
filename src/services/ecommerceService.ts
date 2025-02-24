import type { Ecommerce } from '@/lib/types'
import { fetchFromAPI, fetchWithAuth } from '@/lib/utils'
import { URL_BACKEND } from 'astro:env/client'

export async function fetchEcommerceData(): Promise<{ ok: boolean; data?: Ecommerce; success?: string; error?: string }> {
    return await fetchFromAPI<Ecommerce>(`ecommerce/my-ecommerce`, 'GET')
}

// Función para actualizar o crear un ecommerce
export const createOrUpdateEcommerce = async (ecommerce: Ecommerce | undefined, formData: Partial<Ecommerce>): Promise<{ ok: boolean; data?: Ecommerce; success?: string; error?: string }> => {
    const isEdit = Boolean(ecommerce?.id) // Determina si es POST o PATCH
    const url = isEdit ? `${URL_BACKEND}/ecommerce/my-ecommerce` : `${URL_BACKEND}/ecommerce`

    return await fetchWithAuth<Ecommerce>(url, isEdit ? 'PATCH' : 'POST', formData)
}

// Función para eliminar un ecommerce
export const deleteEcommerce = async (ecommerce: Ecommerce): Promise<{ ok: boolean; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/ecommerce/${ecommerce.id}`
    return await fetchWithAuth<Ecommerce>(url, 'DELETE')
}

// Función para cargar el logo del e-commerce
export const uploadLogoEcommerce = async (ecommerce: Ecommerce | undefined, formData: FormData): Promise<{ ok: boolean; data?: Ecommerce; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/ecommerce/upload-logo`
    return await fetchWithAuth<Ecommerce>(url, 'POST', formData)
}

// Función para cargar el favicon del e-commerce
export const uploadFaviconEcommerce = async (ecommerce: Ecommerce | undefined, formData: FormData): Promise<{ ok: boolean; data?: Ecommerce; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/ecommerce/upload-favicon`
    return await fetchWithAuth<Ecommerce>(url, 'POST', formData)
}

// Función para cargar la imagen principal del e-commerce
export const uploadImageEcommerce = async (ecommerce: Ecommerce | undefined, formData: FormData): Promise<{ ok: boolean; data?: Ecommerce; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/ecommerce/upload-image`
    return await fetchWithAuth<Ecommerce>(url, 'POST', formData)
}

// Función para cargar la imagen de métodos de pago del e-commerce
export const uploadPaymentsImageEcommerce = async (ecommerce: Ecommerce | undefined, formData: FormData): Promise<{ ok: boolean; data?: Ecommerce; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/ecommerce/upload-payments-image`
    return await fetchWithAuth<Ecommerce>(url, 'POST', formData)
}
