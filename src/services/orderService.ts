import type { Order } from '@/lib/types'
import { fetchFromAPI, fetchWithAuth } from '@/lib/utils'
import { URL_BACKEND } from 'astro:env/client'

export async function fetchOrdersData(): Promise<{ ok: boolean; data?: Order[]; success?: string; error?: string }> {
    return await fetchWithAuth<Order[]>(`${URL_BACKEND}/order`, 'GET')
}

// Función para actualizar o crear un pedido
export const createOrUpdateOrder = async (order: Order | undefined, formData: Partial<Order>): Promise<{ ok: boolean; data?: Order; success?: string; error?: string }> => {
    const isEdit = Boolean(order?.id) // Determina si es POST o PATCH
    const url = isEdit ? `order/${order?.id}` : `order`

    return await fetchFromAPI<Order>(url, isEdit ? 'PATCH' : 'POST', formData)
}

// Función para eliminar un pedido
export const deleteOrder = async (order: Order): Promise<{ ok: boolean; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/order/${order.id}`
    return await fetchWithAuth<Order>(url, 'DELETE')
}
