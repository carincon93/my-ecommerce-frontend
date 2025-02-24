import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface CustomDialogProps {
    triggerText: React.ReactNode
    dialogTitle: string
    dialogDescription?: string
    children?: React.ReactNode
}

export function CustomDialog({ triggerText, dialogTitle, dialogDescription, children }: CustomDialogProps) {
    return (
        <Dialog modal={true}>
            <DialogTrigger asChild>{triggerText}</DialogTrigger>
            <DialogContent className="max-w-sm sm:max-w-md mx-auto">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription className="!mb-4 !mt-8">{dialogDescription}</DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button
                            autoFocus={false}
                            type="button"
                            variant="secondary">
                            Cerrar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
