import { fetchEcommerceData } from '@/services/ecommerceService'

import type { Ecommerce } from '@/lib/types'
import { URL_BACKEND_UPLOADS } from 'astro:env/client'

import SVG from 'react-inlinesvg'
import { useEffect, useState } from 'react'

interface LogoProps {}

export default function Logo({}: LogoProps) {
    const [ecommerceData, setEcommerceData] = useState<Ecommerce>()

    const getEcommerceData = async () => {
        const result = await fetchEcommerceData()
        setEcommerceData(result.data)
    }

    useEffect(() => {
        getEcommerceData()
    }, [])

    return (
        <>
            {ecommerceData && (
                <SVG
                    src={`${URL_BACKEND_UPLOADS}/ecommerce/${ecommerceData?.logoDark}`}
                    width={80}
                    height="100%"
                    title="Logo"
                />
            )}
        </>
    )
}
