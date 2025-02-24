import type { Policy } from '@/lib/types'
import { fetchFromAPI, fetchWithAuth } from '@/lib/utils'
import { URL_BACKEND } from 'astro:env/client'

export async function fetchPoliciesData(): Promise<{ ok: boolean; data?: Policy[]; success?: string; error?: string }> {
    return await fetchFromAPI<Policy[]>(`policy`, 'GET')
}

// Función para actualizar o crear una política
export const createOrUpdatePolicy = async (policy: Policy | undefined, formData: Partial<Policy>): Promise<{ ok: boolean; data?: Policy; success?: string; error?: string }> => {
    const isEdit = Boolean(policy?.id) // Determina si es POST o PATCH
    const url = isEdit ? `${URL_BACKEND}/policy/${policy?.id}` : `${URL_BACKEND}/policy`

    return await fetchWithAuth<Policy>(url, isEdit ? 'PATCH' : 'POST', formData)
}

// Función para eliminar una política
export const deletePolicy = async (policy: Policy): Promise<{ ok: boolean; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/policy/${policy.id}`
    return await fetchWithAuth<Policy>(url, 'DELETE')
}
