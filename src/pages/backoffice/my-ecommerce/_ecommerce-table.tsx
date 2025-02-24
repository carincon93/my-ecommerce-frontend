import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomSheet from '@/components/CustomSheet'
import instagram from '@/assets/icons/instagram.svg'
import tiktok from '@/assets/icons/tiktok.svg'
import facebook from '@/assets/icons/facebook.svg'
import whatsapp from '@/assets/icons/whatsapp.svg'

import type { Ecommerce } from '@/lib/types'

import EcommerceForm from './_ecommerce-form.tsx'
import ImageForm from './_image-form.tsx'

import { URL_BACKEND_UPLOADS } from 'astro:env/client'
import { fetchEcommerceData } from '@/services/ecommerceService.ts'
import { CustomBreadcrumb } from '@/components/CustomBreadcrumb.tsx'
import LogoForm from './_logo-form.tsx'

import { Edit2, MapPin, Plus, PlusIcon, Replace, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import PaymentsImageForm from './_payments-image-form.tsx'
import { useToast } from '@/hooks/use-toast.ts'
import FaviconForm from './_favicon-form.tsx'
import { Button } from '@/components/ui/button.tsx'
import SVGIcon from '@/components/icons/SVGIcon.tsx'

interface ImageSheetProps {
    ecommerceData: Ecommerce
    onCreateOrUpdateItem: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const ImageSheet = ({ ecommerceData, onCreateOrUpdateItem }: ImageSheetProps) => {
    return (
        <CustomSheet sheetTrigger={<Button>{ecommerceData?.image ? <Replace size="15px" /> : <Plus size="15px" />}</Button>}>
            <ImageForm
                onImageUploaded={onCreateOrUpdateItem}
                ecommerceData={ecommerceData}
            />
        </CustomSheet>
    )
}

interface LogoSheetProps {
    ecommerceData: Ecommerce
    onCreateOrUpdateItem: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const LogoSheet = ({ ecommerceData, onCreateOrUpdateItem }: LogoSheetProps) => {
    return (
        <CustomSheet sheetTrigger={<Button>{ecommerceData?.logoDark ? <Replace size="15px" /> : <Plus size="15px" />}</Button>}>
            <LogoForm
                onLogoUploaded={onCreateOrUpdateItem}
                ecommerceData={ecommerceData}
            />
        </CustomSheet>
    )
}

interface FaviconSheetProps {
    ecommerceData: Ecommerce
    onCreateOrUpdateItem: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const FaviconSheet = ({ ecommerceData, onCreateOrUpdateItem }: FaviconSheetProps) => {
    return (
        <CustomSheet sheetTrigger={<Button>{ecommerceData?.faviconDark ? <Replace size="15px" /> : <Plus size="15px" />}</Button>}>
            <FaviconForm
                onFaviconUploaded={onCreateOrUpdateItem}
                ecommerceData={ecommerceData}
            />
        </CustomSheet>
    )
}

interface PaymentsImageProps {
    ecommerceData: Ecommerce
    onCreateOrUpdateItem: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const PaymentsImageSheet = ({ ecommerceData, onCreateOrUpdateItem }: PaymentsImageProps) => {
    return (
        <CustomSheet sheetTrigger={<Button>{ecommerceData?.paymentMethodsImageLight ? <Replace size="15px" /> : <Plus size="15px" />}</Button>}>
            <PaymentsImageForm
                onPaymentsImageUploaded={onCreateOrUpdateItem}
                ecommerceData={ecommerceData}
            />
        </CustomSheet>
    )
}

interface CellProps {
    ecommerceData: Ecommerce
    handleEcommerceOperation: (result: { ok: boolean; success?: string; error?: string }) => Promise<void>
}

const Cell = ({ ecommerceData, handleEcommerceOperation }: CellProps) => {
    return (
        <>
            <TableCell>{ecommerceData.name}</TableCell>
            <TableCell>
                <div className="flex space-x-2 items-center">
                    <picture className="aspect-square size-32 block">
                        {ecommerceData?.image && (
                            <img
                                className="object-cover w-full h-full rounded-md"
                                src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.image}`}
                                alt=""
                            />
                        )}
                    </picture>
                    <ImageSheet
                        ecommerceData={ecommerceData}
                        onCreateOrUpdateItem={handleEcommerceOperation}
                    />
                </div>
            </TableCell>
            <TableCell>
                <div className="flex flex-col space-y-2 items-center">
                    <picture className="block p-0.5">
                        {ecommerceData?.paymentMethodsImageLight && (
                            <img
                                className="object-contain w-full h-full rounded-md"
                                src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.paymentMethodsImageLight}`}
                                alt=""
                            />
                        )}
                    </picture>
                    <picture className="block p-0.5 bg-black">
                        {ecommerceData?.paymentMethodsImageDark && (
                            <img
                                className="object-contain w-full h-full rounded-md"
                                src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.paymentMethodsImageDark}`}
                                alt=""
                            />
                        )}
                    </picture>
                    <PaymentsImageSheet
                        ecommerceData={ecommerceData}
                        onCreateOrUpdateItem={handleEcommerceOperation}
                    />
                </div>
            </TableCell>
            <TableCell>
                <div className="flex space-x-2 items-center">
                    <picture className="aspect-square size-10 block border p-1 rounded-md">
                        {ecommerceData?.logoDark && (
                            <img
                                className="object-contain w-full h-full rounded-md"
                                src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.logoDark}`}
                                alt=""
                            />
                        )}
                    </picture>
                    <picture className="aspect-square size-10 block bg-black p-1 rounded-md">
                        {ecommerceData?.logoLight && (
                            <img
                                className="object-contain w-full h-full rounded-md"
                                src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.logoLight}`}
                                alt=""
                            />
                        )}
                    </picture>
                    <LogoSheet
                        ecommerceData={ecommerceData}
                        onCreateOrUpdateItem={handleEcommerceOperation}
                    />
                </div>

                <div className="flex space-x-2 items-center mt-2">
                    <picture className="aspect-square size-10 block border p-1 rounded-md">
                        {ecommerceData?.faviconDark && (
                            <img
                                className="object-contain w-full h-full rounded-md"
                                src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.faviconDark}`}
                                alt=""
                            />
                        )}
                    </picture>
                    <picture className="aspect-square size-10 block bg-black p-1 rounded-md">
                        {ecommerceData?.faviconLight && (
                            <img
                                className="object-contain w-full h-full rounded-md"
                                src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.faviconLight}`}
                                alt=""
                            />
                        )}
                    </picture>
                    <FaviconSheet
                        ecommerceData={ecommerceData}
                        onCreateOrUpdateItem={handleEcommerceOperation}
                    />
                </div>
            </TableCell>
            <TableCell>
                <ul className="flex flex-wrap items-center justify-center space-x-4 space-y-2 2xl:!w-[60%]">
                    <li>
                        <a
                            href={`mailto:${ecommerceData?.email}`}
                            title=""
                            className={`${ecommerceData?.email != '' ? 'bg-black' : 'bg-gray-400'} block p-1 rounded-md hover:opacity-70`}
                            target="_blank">
                            <Mail
                                color="white"
                                size={20}
                            />
                        </a>
                    </li>
                    <li>
                        <a
                            href={ecommerceData?.googleMapsUrl}
                            className={`${ecommerceData?.googleMapsUrl != '' ? 'bg-black' : 'bg-gray-400'} block p-1 rounded-md hover:opacity-70`}
                            target="_blank">
                            <MapPin
                                color="white"
                                size={20}
                            />
                        </a>
                    </li>
                    <li className="shrink-0">
                        <a
                            href={ecommerceData?.instagram}
                            className={`${ecommerceData?.instagram != '' ? 'bg-black' : 'bg-gray-400'} text-white block p-1 rounded-md hover:opacity-70`}
                            target="_blank">
                            <SVGIcon
                                src={instagram.src}
                                size={20}
                            />
                        </a>
                    </li>
                    <li>
                        <a
                            href={ecommerceData?.tiktok}
                            className={`${ecommerceData?.tiktok != '' ? 'bg-black' : 'bg-gray-400'} text-white block p-1 rounded-md hover:opacity-70`}
                            target="_blank">
                            <SVGIcon
                                src={tiktok.src}
                                size={20}
                            />
                        </a>
                    </li>
                    <li>
                        <a
                            href={ecommerceData?.facebook}
                            className={`${ecommerceData?.facebook != '' ? 'bg-black' : 'bg-gray-400'} text-white block p-0.5 rounded-md hover:opacity-70`}
                            target="_blank">
                            <SVGIcon
                                src={facebook.src}
                                size={25}
                            />
                        </a>
                    </li>
                    <li>
                        <a
                            href={ecommerceData?.whatsapp}
                            className={`${ecommerceData?.whatsapp != '' ? 'bg-black' : 'bg-gray-400'} text-white block p-1 rounded-md hover:opacity-70 mb-2`}
                            target="_blank">
                            <SVGIcon
                                src={whatsapp.src}
                                size={20}
                            />
                        </a>
                    </li>
                </ul>
            </TableCell>
        </>
    )
}

export default function EcommerceTable() {
    const [ecommerceData, setEcommerceData] = useState<Ecommerce>()
    const { toast } = useToast()

    const handleEcommerceOperation = async (result: { ok: boolean; success?: string; error?: string }) => {
        getEcommerceData()

        if (result.ok) {
            toast({
                title: 'Good',
                description: result.success,
            })
        } else {
            toast({
                title: 'Bad',
                description: result.error,
            })
        }
    }

    const getEcommerceData = async () => {
        const result = await fetchEcommerceData()
        if (result.data) setEcommerceData(result.data)
    }

    useEffect(() => {
        getEcommerceData()
    }, [])

    const dropdownLinks = [
        { title: 'Categorías', url: '/backoffice/categories' },
        { title: 'Clientes', url: '/backoffice/customers' },
        { title: 'Pedidos', url: '/backoffice/orders' },
        { title: 'Políticas', url: '/backoffice/policies' },
        { title: 'Productos', url: '/backoffice/products' },
    ]
    const homeLink = { title: 'Backoffice', url: '/backoffice' }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-medium mb-6 text-center">
                <span style={{ viewTransitionName: 'ecommerce-text' }}>{ecommerceData?.id ? ecommerceData?.name : 'E-Commerce sin nombre aún.'}</span>
            </h1>
            <div className="max-w-screen-sm lg:max-w-screen-lg xl:max-w-screen-xl mx-auto lg:shadow-md rounded-sm p-4">
                <div className="mb-4">
                    <CustomBreadcrumb
                        homeLink={homeLink}
                        currentPath="Mi E-Commerce"
                        dropdownLinks={dropdownLinks}
                    />
                </div>
                <CustomSheet
                    sheetTrigger={
                        <Button>
                            <small className="flex items-center gap-2 pr-1">{ecommerceData?.id ? <Edit2 size={14} /> : <PlusIcon size={14} />} E-Commerce</small>
                        </Button>
                    }>
                    <EcommerceForm
                        ecommerceData={ecommerceData}
                        onEcommerceCreatedOrUpdated={handleEcommerceOperation}
                    />
                </CustomSheet>

                <div className="hidden lg:block shadow-md rounded-sm mt-4">
                    <Table className="table-fixed p-4 rounded-md">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="uppercase text-xs">E-Commerce</TableHead>
                                <TableHead className="uppercase text-xs">Imagen principal</TableHead>
                                <TableHead className="uppercase text-xs">Imagen de métodos de pago</TableHead>
                                <TableHead className="uppercase text-xs">Logo / Favicon</TableHead>
                                <TableHead className="uppercase text-xs">Redes sociales / Contacto</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ecommerceData?.id ? (
                                <TableRow
                                    className="relative bg-white/80 dark:bg-white/10 backdrop-blur-sm shadow-sm hover:opacity-80"
                                    style={{ viewTransitionName: 'ecommerce-box' }}>
                                    <Cell
                                        ecommerceData={ecommerceData}
                                        handleEcommerceOperation={handleEcommerceOperation}
                                    />
                                </TableRow>
                            ) : (
                                <TableRow style={{ viewTransitionName: 'ecommerce-box' }}>
                                    <TableCell colSpan={2}>
                                        <div className="min-h-[115px] flex items-center">No hay datos de tu e-commerce para mostrar</div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="block lg:hidden space-y-2 mt-4">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-md shadow-sm">
                        <div>
                            <div className="relative">
                                <picture className="aspect-square size-72 mx-auto block">
                                    {ecommerceData?.image && (
                                        <img
                                            className="object-cover w-full h-full rounded-md [-webkit-mask-image:linear-gradient(black_85%,transparent)]"
                                            src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.image}`}
                                            alt=""
                                        />
                                    )}
                                </picture>
                                {ecommerceData && (
                                    <div className="absolute -bottom-2 right-[12%] md:right-[28%]">
                                        <ImageSheet
                                            ecommerceData={ecommerceData}
                                            onCreateOrUpdateItem={getEcommerceData}
                                        />
                                    </div>
                                )}
                            </div>

                            {ecommerceData && (
                                <>
                                    <div className="flex space-x-2 items-center mt-4">
                                        <picture className="aspect-square size-10 block border p-1 rounded-md">
                                            {ecommerceData?.logoDark && (
                                                <img
                                                    className="object-contain w-full h-full  rounded-md"
                                                    src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.logoDark}`}
                                                    alt=""
                                                />
                                            )}
                                        </picture>
                                        <picture className="aspect-square size-10 block bg-black p-1 rounded-md">
                                            {ecommerceData?.logoLight && (
                                                <img
                                                    className="object-contain w-full h-full rounded-md"
                                                    src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.logoLight}`}
                                                    alt=""
                                                />
                                            )}
                                        </picture>
                                        <LogoSheet
                                            ecommerceData={ecommerceData}
                                            onCreateOrUpdateItem={getEcommerceData}
                                        />
                                    </div>

                                    <div className="flex space-x-2 items-center mt-6">
                                        <picture className="aspect-square size-10 block border p-1 rounded-md">
                                            {ecommerceData?.faviconDark && (
                                                <img
                                                    className="object-contain w-full h-full rounded-md"
                                                    src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.faviconDark}`}
                                                    alt=""
                                                />
                                            )}
                                        </picture>
                                        <picture className="aspect-square size-10 block bg-black p-1 rounded-md">
                                            {ecommerceData?.faviconLight && (
                                                <img
                                                    className="object-contain w-full h-full rounded-md"
                                                    src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.faviconLight}`}
                                                    alt=""
                                                />
                                            )}
                                        </picture>
                                        <FaviconSheet
                                            ecommerceData={ecommerceData}
                                            onCreateOrUpdateItem={handleEcommerceOperation}
                                        />
                                    </div>

                                    <div className="flex space-x-2 items-center">
                                        <picture className="aspect-square block w-[88px]">
                                            {ecommerceData?.paymentMethodsImageLight && (
                                                <img
                                                    className="object-contain w-full h-full rounded-md"
                                                    src={`${URL_BACKEND_UPLOADS + '/ecommerce/' + ecommerceData?.paymentMethodsImageLight}`}
                                                    alt=""
                                                />
                                            )}
                                        </picture>
                                        <PaymentsImageSheet
                                            ecommerceData={ecommerceData}
                                            onCreateOrUpdateItem={handleEcommerceOperation}
                                        />
                                    </div>
                                </>
                            )}

                            <ul className="space-y-4 mt-4">
                                <li className="flex items-center space-x-2">
                                    <a
                                        href={`mailto:${ecommerceData?.email}`}
                                        className={`${ecommerceData?.email != '' ? 'bg-black' : 'bg-gray-400'} block p-1 rounded-md hover:opacity-70`}
                                        target="_blank">
                                        <Mail
                                            color="white"
                                            size={20}
                                        />
                                    </a>
                                    <small>{ecommerceData?.email != '' ? ecommerceData?.email : 'No hay una cuanta de correo electrónico registrada'}</small>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <a
                                        href={ecommerceData?.googleMapsUrl}
                                        className={`${ecommerceData?.googleMapsUrl != '' ? 'bg-black' : 'bg-gray-400'} block p-1 rounded-md hover:opacity-70`}
                                        target="_blank">
                                        <MapPin
                                            color="white"
                                            size={20}
                                        />
                                    </a>
                                    <small>{ecommerceData?.address != '' ? ecommerceData?.address : 'No hay una dirección registrada'}</small>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <a
                                        href={ecommerceData?.instagram}
                                        className={`${ecommerceData?.instagram != '' ? 'bg-black' : 'bg-gray-400'} text-white block p-1 rounded-md hover:opacity-70`}
                                        target="_blank">
                                        <SVGIcon
                                            src={instagram.src}
                                            size={20}
                                        />
                                    </a>
                                    <small>{ecommerceData?.instagram != '' ? ecommerceData?.instagram : 'No hay una cuenta de Instagram relacionada'}</small>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <a
                                        href={ecommerceData?.tiktok}
                                        className={`${ecommerceData?.tiktok != '' ? 'bg-black' : 'bg-gray-400'} block p-1 rounded-md hover:opacity-70`}
                                        target="_blank">
                                        <SVGIcon
                                            src={tiktok.src}
                                            size={20}
                                        />
                                    </a>
                                    <small>{ecommerceData?.tiktok != '' ? ecommerceData?.tiktok : 'No hay una cuenta de TikTok relacionada'}</small>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <a
                                        href={ecommerceData?.facebook}
                                        className={`${ecommerceData?.facebook != '' ? 'bg-black' : 'bg-gray-400'} block p-0.5 rounded-md hover:opacity-70`}
                                        target="_blank">
                                        <SVGIcon
                                            src={facebook.src}
                                            size={20}
                                        />
                                    </a>
                                    <small>{ecommerceData?.facebook != '' ? ecommerceData?.facebook : 'No hay una cuenta de Facebook relacionada'}</small>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <a
                                        href={ecommerceData?.whatsapp}
                                        className={`${ecommerceData?.whatsapp != '' ? 'bg-black' : 'bg-gray-400'} block p-1 rounded-md hover:opacity-70`}
                                        target="_blank">
                                        <SVGIcon
                                            src={whatsapp.src}
                                            size={20}
                                        />
                                    </a>
                                    <small>{ecommerceData?.whatsapp != '' ? ecommerceData?.whatsapp : 'No hay una cuenta de WhatsApp relacionada'}</small>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
