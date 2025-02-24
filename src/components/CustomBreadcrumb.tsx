import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import React from 'react'

interface CustomBreadcrumbProps {
    currentPath?: string
    homeLink: {
        title: string
        url: string
    }
    links?: {
        title: string
        url: string
    }[]
    dropdownLinks?: {
        title: string
        url: string
    }[]
    handleBreadcrumbLinkClick?: () => void
}

export function CustomBreadcrumb({ homeLink, links, dropdownLinks, currentPath, handleBreadcrumbLinkClick }: CustomBreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={homeLink.url}>{homeLink.title}</BreadcrumbLink>
                </BreadcrumbItem>

                {dropdownLinks && dropdownLinks?.length > 0 && (
                    <>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1 font-semibold">
                                    {currentPath} <ChevronDown size={12} />
                                    <span className="sr-only">Toggle menu</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {dropdownLinks?.map((link, index) => (
                                        <DropdownMenuItem key={index}>
                                            <BreadcrumbLink
                                                href={link.url}
                                                className="block w-full">
                                                {link.title}
                                            </BreadcrumbLink>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                    </>
                )}

                {links &&
                    links.length > 0 &&
                    links.map((link, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    className={`${currentPath ? (link.url.includes(currentPath) ? 'font-bold' : '') : ''}`}
                                    onClick={handleBreadcrumbLinkClick}
                                    href={link.url}>
                                    {link.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
