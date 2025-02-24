import { decryptData, encryptData } from '@/lib/cripto'
import type { CartItem } from '@/lib/types'
import { atom, map } from 'nanostores'
import Cookies from 'js-cookie'

// Función para añadir un producto al carrito
const addToCart = (updatedCart: CartItem[]) => {
    // Convertimos el carrito a string y lo encriptamos
    const encryptedCart = encryptData(updatedCart)

    // Guardamos el carrito en una cookie
    Cookies.set('cart', encryptedCart, { expires: 7 }) // Cookie expira en 7 días
}

const decryptCart = (Cookie: string | undefined): CartItem[] => {
    const encryptedCart = Cookie

    // Validar que al menos uno de los valores no sea undefined
    const validData = encryptedCart
    if (!validData) {
        console.error('No hay datos disponibles para desencriptar')
        return [] // Salir si no hay datos válidos
    }

    try {
        const decryptedCart = decryptData<CartItem[]>(validData)
        const sortedCartItems = [...decryptedCart].sort((a, b) => a.name.localeCompare(b.name))

        return sortedCartItems
    } catch (error) {
        console.error('Error al desencriptar la cookie del carrito', error)
        return []
    }
}

const addCheckedCartToCookie = (isCartChecked: boolean) => {
    const encryptedData = encryptData({ isCartChecked })

    Cookies.set('checkedCart', encryptedData, { expires: 7 }) // Cookie expira en 7 días
}

const decryptDataFromCookie = <T>(Cookie: string | undefined): T => {
    const encryptedData = Cookie

    // Validar que al menos uno de los valores no sea undefined
    const validData = encryptedData
    if (!validData) {
        console.error('No hay datos disponibles para desencriptar')
        return null as unknown as T
    }

    try {
        const decryptedData = decryptData(validData)

        return decryptedData as unknown as T
    } catch (error) {
        console.error('Error al desencriptar la cookie', error)
        return null as unknown as T
    }
}

const getTotalCartItemsFromCookie = (Cookie: string | undefined): number => {
    const cartItems = decryptCart(Cookie)

    return cartItems ? cartItems.reduce((prev, curr) => prev + curr.quantity, 0) : 0
}

// Calcular total
const calculateTotal = (cartItems: CartItem[]) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return total
}

// Función para actualizar un producto en el carrito
const updateCartInCookie = (newCartItems: CartItem[]) => {
    // Convertimos el carrito a string y lo encriptamos
    const encryptedCart = encryptData(newCartItems)
    // Guardamos el carrito en una cookie
    Cookies.set('cart', encryptedCart, { expires: 7 }) // Cookie expira en 7 días

    return encryptedCart
}

// Inicializa el estado del carrito desde la cookie
const cartCount = atom<number>(0)

export { addToCart, updateCartInCookie, cartCount, calculateTotal, decryptCart, getTotalCartItemsFromCookie, addCheckedCartToCookie, decryptDataFromCookie }

export const sheetStates = map<Record<string, boolean>>({})

export const openSheet = (id: string) => sheetStates.setKey(id, true)
export const closeSheet = (id: string) => sheetStates.setKey(id, false)