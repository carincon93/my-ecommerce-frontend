// @ts-check
import { defineConfig, envField } from 'astro/config'

import react from '@astrojs/react'
import clerk from '@clerk/astro'
import node from '@astrojs/node'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
    env: {
        schema: {
            SECRET_KEY: envField.string({
                context: 'client',
                access: 'public',
            }),
            URL: envField.string({
                context: 'client',
                access: 'public',
            }),
            URL_BACKEND: envField.string({
                context: 'client',
                access: 'public',
            }),
            URL_BACKEND_UPLOADS: envField.string({
                context: 'client',
                access: 'public',
            }),
            PRODUCTS_FOLDER: envField.string({
                context: 'client',
                access: 'public',
            }),
            CLERK_SECRET_KEY: envField.string({
                context: 'server',
                access: 'secret',
            }),
        },
    },

    integrations: [react(), clerk()],
    output: 'server',
    vite: {
        assetsInclude: ['**/*.riv'],
        plugins: [tailwindcss()],
    },
    adapter: node({
        mode: 'standalone',
    }),
})
