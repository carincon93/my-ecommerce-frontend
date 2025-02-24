import type { Ecommerce } from '@/lib/types'
import { Truck } from 'lucide-react'

interface AnnouncementBarProps {
    ecommerceData: Ecommerce
}

export default function AnnouncementBar({ ecommerceData }: AnnouncementBarProps) {
    const blocks = []
    for (let i = 0; i < 3; i++) {
        blocks.push(
            <div key={i}>
                <div className="announcement-bar--item">
                    <Truck />
                    <p className="text-xs text-white">
                        Envío gratis por compras mayores a{' '}
                        {ecommerceData.freeShippingFrom
                            ?.toLocaleString('es-CO', {
                                style: 'currency',
                                currency: 'COP',
                                minimumFractionDigits: 0,
                            })
                            .replace(/\s/g, '')}{' '}
                        🇨🇴 🔥
                    </p>
                </div>
            </div>,
        )
    }

    return (
        <div className="bg-black announcement-bar-section shrink-0 h-10 select-none">
            <div
                className="announcement-bar--inner direction-left announcement-bar--marquee"
                style={{ '--marquee-speed': '40s' } as React.CSSProperties}>
                {blocks}
            </div>
        </div>
    )
}
