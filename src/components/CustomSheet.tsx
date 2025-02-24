import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetClose, SheetTrigger } from '@/components/ui/sheet'
import { X } from 'lucide-react'

interface CustomSheetProps {
    sheetTrigger?: React.ReactNode
    sheetTitle?: string
    sheetDescription?: string
    children?: React.ReactNode
    side?: 'right' | 'top' | 'bottom' | 'left' | null | undefined
}

export default function CustomSheet({ sheetTrigger = 'Open', sheetTitle, sheetDescription, side = 'right', children }: CustomSheetProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>{sheetTrigger}</SheetTrigger>
            <SheetContent
                className="w-full"
                side={side}>
                <SheetHeader className="mb-8">
                    <SheetClose className="mx-2 self-end absolute">
                        <X className="mb-2 text-right" />
                    </SheetClose>
                    <SheetTitle className="text-left flex-1 uppercase leading-5">{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>
                {children}
            </SheetContent>
        </Sheet>
    )
}
