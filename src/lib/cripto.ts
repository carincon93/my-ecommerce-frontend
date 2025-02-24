import CryptoJS from 'crypto-js'
import { SECRET_KEY } from 'astro:env/client'
import type { CartItem } from './types'

// Tipo genérico para aceptar cualquier tipo de datos
export const encryptData = (data: object) => {
    const jsonString = JSON.stringify(data) // Convertir el objeto a una cadena JSON
    const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString() // Encriptar usando AES
    return encrypted // Asegurar compatibilidad con URL
}

export const decryptData = <T>(encryptedData: string): T => {
    try {
        const decodedData = decodeURIComponent(encryptedData) // Decodificar de la URL
        const bytes = CryptoJS.AES.decrypt(decodedData, SECRET_KEY) // Desencriptar usando AES
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8) // Convertir a cadena UTF-8
        if (!decryptedString) throw new Error('Decryption failed')

        return JSON.parse(decryptedString) // Parsear a objeto JSON
    } catch (error) {
        console.error('Error decrypting data:', error)
        return null as unknown as T
    }
}
