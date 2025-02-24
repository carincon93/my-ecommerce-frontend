import type { Ecommerce } from '@/lib/types'
import { URL_BACKEND_UPLOADS } from 'astro:env/client'
import { useEffect, useState } from 'react'
import { fetchEcommerceData } from '@/services/ecommerceService'

interface ParallaxProps {}

export default function Parallax() {
    const [ecommerceData, setEcommerceData] = useState<Ecommerce>()

    const getEcommerceData = async () => {
        const result = await fetchEcommerceData()
        setEcommerceData(result.data)
    }

    useEffect(() => {
        getEcommerceData()
    }, [])

    return (
        <section
            id="hero"
            className="parallax">
            {ecommerceData?.image && (
                <img
                    src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.image}`}
                    className="parallax__persons [-webkit-mask-image:linear-gradient(black_85%,transparent)] animate-blur-fade-out mx-auto object-cover w-[100%] md:w-full max-sm:h-[75%] max-lg:h-[85%] lg:h-full bottom-0 relative max-lg:absolute image-welcome"
                    fetchPriority="high"
                    alt=""
                />
            )}

            <img
                className="parallax__noex max-sm:left-[10%] max-sm:top-[20%] sm:right-[10%] sm:top-[40%] md:top-[60%] xl:right-[20%] xl:bottom-[40%] 2xl:right-[25%]"
                src="/NoEx.svg"
                alt=""
            />
            <img
                className="parallax__crown max-sm:right-[10%] max-sm:top-[20%] sm:left-[28%] sm:top-[20%] md:left-[21%] md:top-[34%] xl:left-[28%] xl:top-[20%] 2xl:left-[20%] 2xl:top-[35%]"
                src="/Crown.svg"
                alt=""
            />
            <img
                className="parallax__x max-sm:left-[10%] max-sm:top-[30%] sm:right-[20%] sm:top-[20%] xl:right-[20%] xl:top-[20%] 2xl:right-[25%]"
                src="/X.svg"
                alt=""
            />
            <img
                className="parallax__circle max-sm:right-[10%] max-sm:top-[35%] sm:top-[70%] md:left-[12%] xl:left-[20%] xl:top-[70%] 2xl:left-[25%]"
                src="/Circle.svg"
                alt=""
            />
        </section>
    )
}
