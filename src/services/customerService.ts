import type { Customer } from '@/lib/types'
import { fetchWithAuth } from '@/lib/utils'
import { URL_BACKEND } from 'astro:env/client'

export async function fetchCustomersData(): Promise<{ ok: boolean; data?: Customer[]; success?: string; error?: string }> {
    return await fetchWithAuth<Customer[]>(`${URL_BACKEND}/customer`, 'GET')
}

// Función para actualizar o crear un cliente
export const createOrUpdateCustomer = async (customer: Customer | undefined, formData: Partial<Customer>): Promise<{ ok: boolean; data?: Customer; success?: string; error?: string }> => {
    const isEdit = Boolean(customer?.id) // Determina si es POST o PATCH
    const url = isEdit ? `${URL_BACKEND}/customer/${customer?.id}` : `${URL_BACKEND}/customer`

    return await fetchWithAuth<Customer>(url, isEdit ? 'PATCH' : 'POST', formData)
}

// Función para eliminar un cliente
export const deleteCustomer = async (customer: Customer): Promise<{ ok: boolean; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/customer/${customer.id}`
    return await fetchWithAuth<Customer>(url, 'DELETE')
}
