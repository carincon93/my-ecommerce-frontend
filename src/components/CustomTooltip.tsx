import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface CustomTooltipProps {
    tooltipTrigger?: React.ReactNode
    children?: React.ReactNode
    side?: 'bottom' | 'top' | 'right' | 'left' | undefined
    contentBackground?: string
}
export default function CustomTooltip({ tooltipTrigger, children, side = 'bottom', contentBackground = 'bg-black' }: CustomTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip open={true}>
                <TooltipTrigger asChild>{tooltipTrigger}</TooltipTrigger>
                <TooltipContent
                    className={`${contentBackground}`}
                    side={side}>
                    {children}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
