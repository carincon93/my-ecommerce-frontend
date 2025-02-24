export interface Product {
    id: string
    label: string
    name: string
    priceBeforeOff?: number
    price: number
    description: string
    colorName: string
    colorHex: string
    slug: string
    stock?: Stock[]
    photos?: Photo[]
    categories?: ProductCategory[]
    variants?: ProductVariant[]
}

export interface Stock {
    id: string
    productId: string
    size: string
    quantity: number
    sku: string
}

export interface Photo {
    id: string
    productId: string
    image: string
    isSizeGuide: boolean
}

export interface Category {
    id: string
    title: string
    name: string
    isMenuVisible: boolean
    ecommerceId: string
}

export interface ProductCategory {
    id: string
    productId: string
    categoryId: string
    category: Category
    product: Product
}

export interface ProductVariant {
    id: string
    productId: string
    variantId: string
    mainProduct: Product
    variantProduct: Product
}

export interface CartItem {
    id: string
    name: string
    slug: string
    price: number
    image: string
    quantity: number
    stock: Stock
}

export interface Ecommerce {
    id: string
    name: string
    email: string
    image: string
    paymentMethodsImageLight: string
    paymentMethodsImageDark: string
    logoDark: string
    logoLight: string
    faviconDark: string
    faviconLight: string
    instagram?: string
    tiktok?: string
    facebook?: string
    whatsapp: string
    address: string
    googleMapsUrl?: string
    shipping: number
    freeShippingFrom: number
    policies?: Policy[]
    categories?: Category[]
}

export interface Policy {
    id: string
    title: string
    content: string
    ecommerceId: string
    ecommerce: Ecommerce
}

export interface Customer {
    id: string
    name: string
    lastname: string
    email: string
    password?: string
    address: string
    phone: string
    country: string
    city: string
    state: string
    dniType: string
    dniNumber: string
}

export interface Order {
    id: string
    customerId: string
    ecommerceId: string
    status: string
    cart: string
    totalCart: number
    totalWithShipping: number
    trackingNumber?: string
    trackingCompany?: string
    trackingUrl?: string
    customer: Customer
    ecommerce: Ecommerce
    items: OrderItem[]
}

export interface OrderItem {
    id: string
    sku: string
    orderId: string
    status: string
}
