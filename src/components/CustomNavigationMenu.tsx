import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { CustomDialog } from '@/components/CustomDialog'
import { ModeToggle } from '@/components/ModeToggle'
import AnnouncementBar from '@/components/AnnouncementBar'
import Logo from '@/components/icons/Logo'

import { cn } from '@/lib/utils'
import { cartCount, getTotalCartItemsFromCookie } from '@/stores/cartStore'
import { $userStore } from '@clerk/astro/client'

import type { Ecommerce } from '@/lib/types'
import { fetchEcommerceData } from '@/services/ecommerceService'

import { Menu, MoveRight, ShoppingCart } from 'lucide-react'

import pkg from 'lodash'
import Cookies from 'js-cookie'
import { useStore } from '@nanostores/react'
import { forwardRef, useEffect, useState } from 'react'

interface CustomNavigationMenuProps {
    pathName?: string
}

export default function CustomNavigationMenu({ pathName }: CustomNavigationMenuProps) {
    const [ecommerceData, setEcommerceData] = useState<Ecommerce>()
    const [isSticky, setIsSticky] = useState(false)
    const [itemsCount, setItemsCount] = useState(0)
    const [isUserAdmin, setIsUserAdmin] = useState(false)
    const $itemsCount = useStore(cartCount)
    const user = useStore($userStore)
    const { debounce } = pkg
    const cookie = Cookies.get('cart')


    const getEcommerceData = async () => {
        const result = await fetchEcommerceData()
        setEcommerceData(result.data)
    }

    useEffect(() => {
        getEcommerceData()
    }, [])

    const handleScroll = debounce(() => {
        if (window.scrollY > 40) {
            setIsSticky(true)
        } else {
            setIsSticky(false)
        }
    }, 10)

    const updateTitle = debounce(() => {
        const currentTitle = document.title

        // Omitir el número entre paréntesis al inicio
        const cleanTitle = currentTitle.replace(/^\(\d+\)\s*/, '')

        document.title = '(' + cartCount.get().toString() + ') ' + cleanTitle.replace(/^\w+/, (match: string) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase())
    }, 10)

    useEffect(() => {
        cartCount.set(getTotalCartItemsFromCookie(cookie))

        // Verificar posición inicial del scroll
        handleScroll()

        // Agregar el evento de scroll
        window.addEventListener('scroll', handleScroll)

        // Cleanup al desmontar
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        cartCount.set(getTotalCartItemsFromCookie(cookie))

        setItemsCount($itemsCount)

        updateTitle()
    }, [$itemsCount])

    useEffect(() => {
        if (user?.id) {
            setIsUserAdmin(true)
        }
    }, [user])

    return (
        <>
            {ecommerceData && pathName && pathName?.length === 1 && <AnnouncementBar ecommerceData={ecommerceData} />}
            <div
                id="nav-menu-wrapper"
                className={`${
                    isSticky ? 'sticky top-0 is-sticky shadow-md' : 'sticky border-b'
                } group bg-white/1 dark:bg-black/30 backdrop-blur-[10px] flex items-center justify-between px-10 w-full min-h-[90px] shrink-0 z-10`}>
                <div className="flex-1 inline-block lg:hidden text-left">
                    <CustomDialog
                        triggerText={<Menu className="hamburger [.is-sticky_&]:text-white" />}
                        dialogTitle="Menu"
                        dialogDescription="">
                        <ul className="space-y-4">
                            {ecommerceData?.categories
                                ?.filter((category) => category.isMenuVisible === true)
                                .map((category) => (
                                    <li key={category.id}>
                                        <a
                                            className="p-4 border border-gray-200 w-full rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors delay-100"
                                            href={`/categories/${category.title.toLowerCase().replaceAll(' ', '-')}`}>
                                            {category.name}
                                            <MoveRight className="text-gray-400" />
                                        </a>
                                    </li>
                                ))}
                        </ul>
                    </CustomDialog>
                </div>

                <div className="flex-1 max-lg:text-center">
                    <a
                        href="/"
                        className="logo inline-block translate-y-1.5 [.is-sticky_&]:text-white menu-item hover:opacity-80"
                        title="">
                        <Logo />
                    </a>
                </div>
                <NavigationMenu className="mx-auto inset-x-0 py-6 flex-1 hidden lg:inline-block">
                    <NavigationMenuList>
                        {ecommerceData?.categories
                            ?.filter((category) => category.isMenuVisible === true)
                            ?.map((category) => (
                                <NavigationMenuItem
                                    className="uppercase"
                                    key={category.id}>
                                    <NavigationMenuLink
                                        className={`${`${navigationMenuTriggerStyle()} bg-transparent`} [.is-sticky_&]:text-white [.is-sticky_&]:hover:text-black dark:[.is-sticky_&]:hover:text-white menu-item menu-item-hoverable`}
                                        href={`/categories/${category.title.toLowerCase().replaceAll(' ', '-')}`}>
                                        {category.name}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="uppercase bg-transparent [.is-sticky_&]:text-white [.is-sticky_&]:hover:text-black [.is-sticky_&]:hover:bg-white menu-item menu-item-hoverable">
                                Familia
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-white">
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a
                                                className="not-hoverable flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="/">
                                                <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem
                                        href="/docs"
                                        className="not-hoverable"
                                        title="Introduction">
                                        Re-usable components built using Radix UI and Tailwind CSS.
                                    </ListItem>
                                    <ListItem
                                        href="/docs/installation"
                                        className="not-hoverable"
                                        title="Installation">
                                        How to install dependencies and structure your app.
                                    </ListItem>
                                    <ListItem
                                        href="/docs/primitives/typography"
                                        className="not-hoverable"
                                        title="Typography">
                                        Styles for headings, paragraphs, lists...etc
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex-1">
                    <ul className="flex items-center justify-end space-x-4 pagos">
                        <li>
                            <ModeToggle />
                        </li>
                        <li className="hidden lg:inline-block text-xs [.is-sticky_&]:text-white menu-item hover:opacity-80 select-none">Colombia (COP $)</li>
                       

                        <li className="relative">
                            <a
                                href="/cart"
                                className="cart [.is-sticky_&]:text-white menu-item hover:opacity-80">
                                <ShoppingCart />
                                <span className="absolute [.is-sticky_&]:bg-white dark:bg-white dark:text-black bg-black rounded-full flex items-center justify-center size-[10px] [.is-sticky_&]:text-black text-white text-[9px] p-2.5 -top-2 -right-4 items-counter">
                                    {itemsCount}
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

const ListItem = forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className,
                    )}
                    {...props}>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem'
