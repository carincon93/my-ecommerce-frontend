import type { Product } from './types'

export const dniTypes = [
    { name: 'Cédula de Ciudadanía', shortName: 'CC' },
    { name: 'NIT', shortName: 'NIT' },
    { name: 'Cédula de Extrajería', shortName: 'CE' },
    { name: 'Pasaporte', shortName: 'PAS' },
    { name: 'Tarjeta de Extranjería', shortName: 'TE' },
    { name: 'Tarjeta de Identidad ', shortName: 'TI' },
    { name: 'Registro Civil', shortName: 'RC' },
    { name: 'Documento de Identificación', shortName: 'DI' },
]

export const products: Product[] = [
    {
        id: 'a',
        label: 'GEEK HUNTERS',
        name: 'Camiseta Oversize Enredado pero Parchado - Negra glow',
        price: 149900,
        photos: [
            {
                id: 'a',
                image: '/t-shirts/2BLACKTSHIRT.webp',
            },
            {
                id: 'a',
                image: '/t-shirts/2BLACKTSHIRT.webp',
            },
        ],
        description:
            'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
        color: 'Negra glow',
        slug: '2BLACKTSHIRT',
        categories: [
            { id: 'a', name: 'camisetas' },
            { id: 'a', name: 't-shirts' },
            { id: 'a', name: 'unisex' },
            { id: 'a', name: 'nuevo' },
            { id: 'a', name: 'men' },
            { id: 'a', name: 'hombre' },
        ],
        stock: [
            {
                id: 'a',
                size: 'S',
                productId: '',
                quantity: 5,
                sku: 'S2BLACKTSHIRT',
            },
            {
                id: 'a',
                size: 'M',
                productId: '',
                quantity: 3,
                sku: 'M2BLACKTSHIRT',
            },
            {
                id: 'a',
                size: 'L',
                productId: '',
                quantity: 0,
                sku: 'L2BLACKTSHIRT',
            },
            {
                id: 'a',
                size: 'XL',
                productId: '',
                quantity: 9,
                sku: 'XL2BLACKTSHIRT',
            },
        ],
        variants: [
            {
                id: 'a',
                label: 'GEEK HUNTERS',
                name: 'Camiseta Oversize Enredado pero Parchado - Vainilla',
                price: 149900,
                photos: [
                    {
                        id: 'a',
                        image: '/t-shirts/2VANILLATSHIRT.webp',
                    },
                ],
                description:
                    'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
                color: 'Vainilla',
                slug: '2VANILLATSHIRT',
                categories: [
                    { id: 'a', name: 'camisetas' },
                    { id: 'a', name: 't-shirts' },
                    { id: 'a', name: 'unisex' },
                    { id: 'a', name: 'nuevo' },
                ],
                stock: [
                    {
                        id: 'a',
                        size: 'S',
                        productId: '',
                        quantity: 5,
                        sku: 'S2VANILLATSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'M',
                        productId: '',
                        quantity: 3,
                        sku: 'M2VANILLATSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'L',
                        productId: '',
                        quantity: 8,
                        sku: 'L2VANILLATSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'XL',
                        productId: '',
                        quantity: 9,
                        sku: 'XL2VANILLATSHIRT',
                    },
                ],
            },
            {
                id: 'a',
                label: 'GEEK HUNTERS',
                name: 'Camiseta Oversize Enredado pero Parchado - Blanca',
                price: 149900,
                photos: [
                    {
                        id: 'a',
                        image: '/t-shirts/2WHITETSHIRT.webp',
                    },
                ],
                description:
                    'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
                color: 'Blanca',
                slug: '2WHITETSHIRT',
                categories: [
                    { id: 'a', name: 'camisetas' },
                    { id: 'a', name: 't-shirts' },
                    { id: 'a', name: 'unisex' },
                    { id: 'a', name: 'nuevo' },
                ],
                stock: [
                    {
                        id: 'a',
                        size: 'S',
                        productId: '',
                        quantity: 5,
                        sku: 'S2WHITETSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'M',
                        productId: '',
                        quantity: 5,
                        sku: 'M2WHITETSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'L',
                        productId: '',
                        quantity: 8,
                        sku: 'L2WHITETSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'XL',
                        productId: '',
                        quantity: 9,
                        sku: 'XL2WHITETSHIRT',
                    },
                ],
            },
        ],
    },
    {
        id: 'a',
        label: 'GEEK HUNTERS',
        name: 'Camiseta Oversize Hohoho Clara',
        price: 114900,
        photos: [
            {
                id: 'a',
                image: 'https://geekhunters.com.co/cdn/shop/files/Hohohoclara2.jpg',
            },
        ],
        description:
            'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
        color: 'Blanca',
        slug: 'Hohohoclara2',
        categories: [
            { id: 'a', name: 'camisetas' },
            { id: 'a', name: 't-shirts' },
            { id: 'a', name: 'unisex' },
            { id: 'a', name: 'nuevo' },
        ],
        stock: [
            {
                id: 'a',
                size: 'S',
                productId: '',
                quantity: 5,
                sku: 'SHohohoclara2',
            },
            {
                id: 'a',
                size: 'M',
                productId: '',
                quantity: 3,
                sku: 'MHohohoclara2',
            },
            {
                id: 'a',
                size: 'L',
                productId: '',
                quantity: 8,
                sku: 'LHohohoclara2',
            },
            {
                id: 'a',
                size: 'XL',
                productId: '',
                quantity: 9,
                sku: 'XLHohohoclara2',
            },
        ],
    },
    {
        id: 'a',
        label: 'GEEK HUNTERS',
        name: 'Camiseta Oversize Arigato Sumercé',
        price: 114900,
        photos: [
            {
                id: 'a',
                image: 'https://geekhunters.com.co/cdn/shop/files/ARIGATO22.jpg',
            },
        ],
        description:
            'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
        color: 'Vainilla',
        slug: 'ARIGATO22',
        categories: [
            { id: 'a', name: 'camisetas' },
            { id: 'a', name: 't-shirts' },
            { id: 'a', name: 'unisex' },
            { id: 'a', name: 'nuevo' },
        ],
        stock: [
            {
                id: 'a',
                size: 'S',
                productId: '',
                quantity: 5,
                sku: 'SARIGATO22',
            },
            {
                id: 'a',
                size: 'M',
                productId: '',
                quantity: 13,
                sku: 'MARIGATO22',
            },
            {
                id: 'a',
                size: 'L',
                productId: '',
                quantity: 8,
                sku: 'LARIGATO22',
            },
            {
                id: 'a',
                size: 'XL',
                productId: '',
                quantity: 9,
                sku: 'XLARIGATO22',
            },
        ],
    },
    {
        id: 'a',
        label: 'GEEK HUNTERS',
        name: 'Camiseta Oversize Tintico',
        price: 114900,
        photos: [
            {
                id: 'a',
                image: 'https://geekhunters.com.co/cdn/shop/files/2Oversize-Tintico.jpg',
            },
        ],
        description:
            'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
        color: 'Blanca',
        slug: '2Oversize-Tintico',
        categories: [
            { id: 'a', name: 'camisetas' },
            { id: 'a', name: 't-shirts' },
            { id: 'a', name: 'unisex' },
            { id: 'a', name: 'nuevo' },
        ],
        stock: [
            {
                id: 'a',
                size: 'S',
                productId: '',
                quantity: 5,
                sku: 'S2Oversize-Tintico',
            },
            {
                id: 'a',
                size: 'M',
                productId: '',
                quantity: 3,
                sku: 'M2Oversize-Tintico',
            },
            {
                id: 'a',
                size: 'L',
                productId: '',
                quantity: 8,
                sku: 'L2Oversize-Tintico',
            },
            {
                id: 'a',
                size: 'XL',
                productId: '',
                quantity: 9,
                sku: 'XL2Oversize-Tintico',
            },
        ],
    },
    {
        id: 'a',
        label: 'GEEK HUNTERS',
        name: 'Camiseta Oversize - I Want To Believe',
        price: 114900,
        photos: [
            {
                id: 'a',
                image: '/pijamas/2SCREAMPIJAMA.webp',
            },
        ],
        description:
            'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
        color: 'Negra',
        slug: '2IWANTTOBELIEVE',
        categories: [
            { id: 'a', name: 'camisetas' },
            { id: 'a', name: 't-shirts' },
            { id: 'a', name: 'unisex' },
            { id: 'a', name: 'destacado' },
            { id: 'a', name: 'nuevo' },
            { id: 'a', name: 'men' },
            { id: 'a', name: 'hombre' },
            { id: 'a', name: 'pijama' },
        ],
        stock: [
            {
                id: 'a',
                size: 'S',
                productId: '',
                quantity: 5,
                sku: 'S2IWANTTOBELIEVE',
            },
            {
                id: 'a',
                size: 'M',
                productId: '',
                quantity: 3,
                sku: 'M2IWANTTOBELIEVE',
            },
            {
                id: 'a',
                size: 'L',
                productId: '',
                quantity: 8,
                sku: 'L2IWANTTOBELIEVE',
            },
            {
                id: 'a',
                size: 'XL',
                productId: '',
                quantity: 9,
                sku: 'XL2IWANTTOBELIEVE',
            },
        ],
    },
    {
        id: 'a',
        label: 'GEEK HUNTERS',
        name: 'Camiseta Oversize Enredado pero Parchado - Vainilla',
        price: 149900,
        photos: [
            {
                id: 'a',
                image: '/t-shirts/2VANILLATSHIRT.webp',
            },
        ],
        description:
            'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
        color: 'Vainilla',
        slug: '2VANILLATSHIRT',
        categories: [
            { id: 'a', name: 'camisetas' },
            { id: 'a', name: 't-shirts' },
            { id: 'a', name: 'unisex' },
            { id: 'a', name: 'nuevo' },
        ],
        stock: [
            {
                id: 'a',
                size: 'S',
                productId: '',
                quantity: 5,
                sku: 'S2VANILLATSHIRT',
            },
            {
                id: 'a',
                size: 'M',
                productId: '',
                quantity: 3,
                sku: 'M2VANILLATSHIRT',
            },
            {
                id: 'a',
                size: 'L',
                productId: '',
                quantity: 8,
                sku: 'L2VANILLATSHIRT',
            },
            {
                id: 'a',
                size: 'XL',
                productId: '',
                quantity: 9,
                sku: 'XL2VANILLATSHIRT',
            },
        ],
        variants: [
            {
                id: 'a',
                label: 'GEEK HUNTERS',
                name: 'Camiseta Oversize Enredado pero Parchado - Negra glow',
                price: 149900,
                photos: [
                    {
                        id: 'a',
                        image: '/t-shirts/2BLACKTSHIRT.webp',
                    },
                ],
                description:
                    'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
                color: 'Negra glow',
                slug: '2BLACKTSHIRT',
                categories: [
                    { id: 'a', name: 'camisetas' },
                    { id: 'a', name: 't-shirts' },
                    { id: 'a', name: 'unisex' },
                    { id: 'a', name: 'nuevo' },
                ],
                stock: [
                    {
                        id: 'a',
                        size: 'S',
                        productId: '',
                        quantity: 5,
                        sku: 'S2BLACKTSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'M',
                        productId: '',
                        quantity: 3,
                        sku: 'M2BLACKTSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'L',
                        productId: '',
                        quantity: 8,
                        sku: 'L2BLACKTSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'XL',
                        productId: '',
                        quantity: 9,
                        sku: 'XL2BLACKTSHIRT',
                    },
                ],
            },
            {
                id: 'a',
                label: 'GEEK HUNTERS',
                name: 'Camiseta Oversize Enredado pero Parchado - Blanca',
                price: 149900,
                photos: [
                    {
                        id: 'a',
                        image: '/t-shirts/2WHITETSHIRT.webp',
                    },
                ],
                description:
                    'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
                color: 'Blanca',
                slug: '2WHITETSHIRT',
                categories: [
                    { id: 'a', name: 'camisetas' },
                    { id: 'a', name: 't-shirts' },
                    { id: 'a', name: 'unisex' },
                    { id: 'a', name: 'nuevo' },
                ],
                stock: [
                    {
                        id: 'a',
                        size: 'S',
                        productId: '',
                        quantity: 5,
                        sku: 'S2WHITETSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'M',
                        productId: '',
                        quantity: 5,
                        sku: 'M2WHITETSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'L',
                        productId: '',
                        quantity: 8,
                        sku: 'L2WHITETSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'XL',
                        productId: '',
                        quantity: 9,
                        sku: 'XL2WHITETSHIRT',
                    },
                ],
            },
        ],
    },
    {
        id: 'a',
        label: 'GEEK HUNTERS',
        name: 'Camiseta Oversize Enredado pero Parchado - Blanca',
        price: 149900,
        photos: [
            {
                id: 'a',
                image: '/t-shirts/2WHITETSHIRT.webp',
            },
        ],
        description:
            'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
        color: 'Blanca',
        slug: '2WHITETSHIRT',
        categories: [
            { id: 'a', name: 'camisetas' },
            { id: 'a', name: 't-shirts' },
            { id: 'a', name: 'unisex' },
            { id: 'a', name: 'nuevo' },
        ],
        stock: [
            {
                id: 'a',
                size: 'S',
                productId: '',
                quantity: 5,
                sku: 'S2WHITETSHIRT',
            },
            {
                id: 'a',
                size: 'M',
                productId: '',
                quantity: 5,
                sku: 'M2WHITETSHIRT',
            },
            {
                id: 'a',
                size: 'L',
                productId: '',
                quantity: 8,
                sku: 'L2WHITETSHIRT',
            },
            {
                id: 'a',
                size: 'XL',
                productId: '',
                quantity: 9,
                sku: 'XL2WHITETSHIRT',
            },
        ],
        variants: [
            {
                id: 'a',
                label: 'GEEK HUNTERS',
                name: 'Camiseta Oversize Enredado pero Parchado - Negra glow',
                price: 149900,
                photos: [
                    {
                        id: 'a',
                        image: '/t-shirts/2BLACKTSHIRT.webp',
                    },
                ],
                description:
                    'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
                color: 'Negra glow',
                slug: '2BLACKTSHIRT',
                categories: [
                    { id: 'a', name: 'camisetas' },
                    { id: 'a', name: 't-shirts' },
                    { id: 'a', name: 'unisex' },
                    { id: 'a', name: 'nuevo' },
                ],
                stock: [
                    {
                        id: 'a',
                        size: 'S',
                        productId: '',
                        quantity: 5,
                        sku: 'S2BLACKTSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'M',
                        productId: '',
                        quantity: 3,
                        sku: 'M2BLACKTSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'L',
                        productId: '',
                        quantity: 8,
                        sku: 'L2BLACKTSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'XL',
                        productId: '',
                        quantity: 9,
                        sku: 'XL2BLACKTSHIRT',
                    },
                ],
            },
            {
                id: 'a',
                label: 'GEEK HUNTERS',
                name: 'Camiseta Oversize Enredado pero Parchado - Vainilla',
                price: 149900,
                photos: [
                    {
                        id: 'a',
                        image: '/t-shirts/2VANILLATSHIRT.webp',
                    },
                ],
                description:
                    'Nuestro gato acaba de llegar al espacio. Al parecer su centro gravitacional fue alterado y ahora tendrá que salvar al planeta.\n\nLa camiseta STAY te brinda comodidad y estilo al mismo tiempo. Con una representación de una película que todos amamos, esta camiseta es perfecta para los fanáticos del cine.\n\nRegular Fit\n100% algodón\n153gr Alta densidad del tejido\nCinta tapacostura en cuello y hombros',
                color: 'Vainilla',
                slug: '2VANILLATSHIRT',
                categories: [
                    { id: 'a', name: 'camisetas' },
                    { id: 'a', name: 't-shirts' },
                    { id: 'a', name: 'unisex' },
                    { id: 'a', name: 'nuevo' },
                ],
                stock: [
                    {
                        id: 'a',
                        size: 'S',
                        productId: '',
                        quantity: 5,
                        sku: 'S2VANILLATSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'M',
                        productId: '',
                        quantity: 3,
                        sku: 'M2VANILLATSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'L',
                        productId: '',
                        quantity: 8,
                        sku: 'L2VANILLATSHIRT',
                    },
                    {
                        id: 'a',
                        size: 'XL',
                        productId: '',
                        quantity: 9,
                        sku: 'XL2VANILLATSHIRT',
                    },
                ],
            },
        ],
    },
]
