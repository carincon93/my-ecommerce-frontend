import instagram from '@/assets/icons/instagram.svg'
import tiktok from '@/assets/icons/tiktok.svg'
import facebook from '@/assets/icons/facebook.svg'
import whatsapp from '@/assets/icons/whatsapp.svg'

import CustomAccordion from '@/components/CustomAccordion'
import CustomSheet from '@/components/CustomSheet'
import Logo from '@/components/icons/Logo'

import type { Ecommerce } from '@/lib/types'
import { CustomDialog } from './CustomDialog'
import { Button } from './ui/button'
import { Mail } from 'lucide-react'
import { formatPhoneNumber } from '@/lib/utils'
import SVGIcon from './icons/SVGIcon'

interface FooterProps {
    ecommerceData: Ecommerce | undefined
}

export default function Footer({ ecommerceData }: FooterProps) {
    const menuCategories = ecommerceData?.categories?.filter((category) => category.isMenuVisible === true)

    return (
        <footer className="relative bg-black text-white overflow-hidden">
            <div className="absolute inset-0">
                <span className="w-9/12 h-full overflow-hidden absolute inset-0 mx-auto  bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-white)]/10 after:inset-ring-white/10 rounded-full"></span>
                <span
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(49.63% 57.02% at 58.99% -7.2%, rgba(255, 164, 28, 0.1) 39.4%, rgba(0, 0, 0, 0) 100%)' }}></span>
            </div>
            <div className="px-10 py-20 grid grid-cols-1 md:grid-cols-4 gap-10 z-0 relative">
                <div>
                    <div className="py-4">
                        <Logo />
                    </div>
                    <ul className="flex items-center space-x-4 mt-8">
                        {ecommerceData?.instagram && (
                            <li>
                                <a
                                    href={ecommerceData?.instagram}
                                    className="hover:opacity-90"
                                    target="_blank">
                                    <SVGIcon
                                        src={instagram.src}
                                        size={15}
                                    />
                                </a>
                            </li>
                        )}
                        {ecommerceData?.tiktok && (
                            <li>
                                <a
                                    href={ecommerceData?.tiktok}
                                    className="hover:opacity-90"
                                    target="_blank">
                                    <SVGIcon
                                        src={tiktok.src}
                                        size={15}
                                    />
                                </a>
                            </li>
                        )}
                        {ecommerceData?.facebook && (
                            <li>
                                <a
                                    href={ecommerceData?.facebook}
                                    className="hover:opacity-90"
                                    target="_blank">
                                    <SVGIcon
                                        src={facebook.src}
                                        size={15}
                                    />
                                </a>
                            </li>
                        )}
                        {ecommerceData?.whatsapp && (
                            <li>
                                <a
                                    href={`https://wa.me/57${ecommerceData?.whatsapp}?text=Hola, quiero más información sobre sus productos 😊`}
                                    className="hover:opacity-90"
                                    target="_blank">
                                    <SVGIcon
                                        src={whatsapp.src}
                                        size={15}
                                    />
                                </a>
                            </li>
                        )}
                    </ul>
                </div>

                <div>
                    <CustomAccordion
                        triggerText="Información"
                        defaultValue="item-1">
                        <ul className="text-sm grid gap-1">
                            {ecommerceData?.policies?.map((policy) => (
                                <li key={policy.id}>
                                    <CustomSheet
                                        sheetTitle={policy.title.toUpperCase()}
                                        sheetTrigger={<span className="hover:cursor-pointer hover:underline underline-offset-4">{policy.title}</span>}>
                                        <p
                                            className="whitespace-pre-line h-[80dvh] overflow-y-auto"
                                            style={{ scrollbarWidth: 'none' }}
                                            dangerouslySetInnerHTML={{
                                                __html: policy.content
                                                    .replace(
                                                        '{shipping}',
                                                        ecommerceData.shipping.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).replace(/\s/g, ''),
                                                    )
                                                    .replace(
                                                        '{freeShippingFrom}',
                                                        ecommerceData.freeShippingFrom.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).replace(/\s/g, ''),
                                                    ),
                                            }}></p>
                                    </CustomSheet>
                                </li>
                            ))}

                            <li>
                                <CustomDialog
                                    triggerText={
                                        <Button
                                            variant="link"
                                            className="font-normal p-0 text-white">
                                            Contáctanos
                                        </Button>
                                    }
                                    dialogTitle="Contáctanos"
                                    dialogDescription="Escríbenos al WhatsApp o correo electrónico.">
                                    <ul className="flex justify-between items-center">
                                        <li>
                                            <a
                                                href={`https://wa.me/57${ecommerceData?.whatsapp}?text=Hola, quiero más información sobre sus productos 😊`}
                                                className="flex items-center space-x-2 hover:opacity-90"
                                                target="_blank">
                                                <SVGIcon
                                                    src={whatsapp.src}
                                                    size={15}
                                                />
                                                <small>
                                                    {ecommerceData && ecommerceData?.whatsapp != '' ? formatPhoneNumber(ecommerceData.whatsapp) : 'No hay una cuenta de WhatsApp relacionada'}
                                                </small>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`mailto:${ecommerceData?.email}`}
                                                className="flex items-center space-x-2 hover:opacity-90"
                                                target="_blank">
                                                <Mail size={16} />
                                                <small>{ecommerceData?.email != '' ? ecommerceData?.email : 'No hay una cuanta de correo electrónico registrada'}</small>
                                            </a>
                                        </li>
                                    </ul>
                                </CustomDialog>
                            </li>
                        </ul>
                    </CustomAccordion>
                </div>
                <div>
                    <CustomAccordion
                        triggerText="Categorías"
                        defaultValue="item-1">
                        <ul className="text-sm mb-[39px]">
                            {menuCategories && menuCategories.length > 0 ? (
                                menuCategories.map((category) => (
                                    <li key={category.id}>
                                        <a href={`/categories/${category.title.toLowerCase().replaceAll(' ', '-')}`}>{category.name}</a>
                                    </li>
                                ))
                            ) : (
                                <li>No hay categorías</li>
                            )}
                        </ul>
                    </CustomAccordion>
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-8 pt-4">Lista de correos</h4>
                    <p className="text-xs">Suscríbete a nuestra lista de correo y entérate de los últimos lanzamientos y promociones.</p>
                </div>
            </div>
        </footer>
    )
}
