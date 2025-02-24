import type { OrderItem } from '@/lib/types'
import { fetchWithAuth } from '@/lib/utils'
import { URL_BACKEND } from 'astro:env/client'

export async function fetchOrderItemsData(): Promise<{ ok: boolean; data?: OrderItem[]; success?: string; error?: string }> {
    return await fetchWithAuth<OrderItem[]>(`${URL_BACKEND}/order-item`, 'GET')
}

// Función para actualizar o crear un ítem de pedido
export const createOrUpdateOrderItem = async (orderItem: OrderItem | undefined, formData: Partial<OrderItem>): Promise<{ ok: boolean; data?: OrderItem; success?: string; error?: string }> => {
    const isEdit = Boolean(orderItem?.id) // Determina si es POST o PATCH
    const url = isEdit ? `${URL_BACKEND}/order-item/${orderItem}` : `${URL_BACKEND}/order-item`

    return await fetchWithAuth<OrderItem>(url, isEdit ? 'PATCH' : 'POST', formData)
}

// Función para eliminar un ítem de pedido
export const deleteOrderItem = async (orderItem: OrderItem): Promise<{ ok: boolean; success?: string; error?: string }> => {
    const url = `${URL_BACKEND}/order-item/${orderItem.id}`
    return await fetchWithAuth<OrderItem>(url, 'DELETE')
}
