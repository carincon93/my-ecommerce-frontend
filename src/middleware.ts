import { clerkMiddleware } from '@clerk/astro/server'
import { CLERK_SECRET_KEY } from 'astro:env/server'

export const onRequest = clerkMiddleware(async (auth, context, next) => {
    const { userId } = auth()

    // Si el usuario no está autenticado y la ruta está protegida, redirige al inicio de sesión
    if (!userId && isProtectedRoute(context.request)) {
        return Response.redirect(new URL('/sign-in', context.url), 302)
    }

    // Si el usuario está autenticado, obtiene los datos del usuario
    if (userId) {
        try {
            const userData = await getAuthUserData(userId)

            // Verifica si el usuario tiene el rol de admin
            const userRoles = userData.public_metadata?.roles || []
            const isAdmin = userRoles.includes('admin')

            const pathname = new URL(context.request.url).pathname

            if (pathname.startsWith('/backoffice')) {
                if (!isAdmin) {
                    // Si el usuario intenta acceder a /backoffice sin ser admin, redirige a la raíz
                    return Response.redirect(new URL('/', context.url), 302)
                }
            }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error)
            return new Response('Error al procesar la solicitud', { status: 500 })
        }
    }

    // Si no hay condiciones específicas, continúa con la solicitud
    return next()
})

// Función para determinar si una ruta está protegida
function isProtectedRoute(request: Request): boolean {
    const protectedRoutes = ['/backoffice'] // Rutas protegidas
    const pathname = new URL(request.url).pathname
    return protectedRoutes.some((route) => pathname.startsWith(route))
}

// Función para obtener los datos del usuario desde Clerk
const getAuthUserData = async (userId: string | null) => {
    if (userId) {
        const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${CLERK_SECRET_KEY}`,
            },
        })

        if (!response.ok) {
            throw new Error('Error al obtener datos del usuario desde Clerk')
        }

        return response.json()
    }
    throw new Error('User ID no proporcionado')
}
