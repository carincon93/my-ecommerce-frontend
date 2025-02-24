import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface CustomAccordionProps {
    triggerText: string
    defaultValue?: string
    classNameTrigger?: string
    children?: React.ReactNode
}

export default function CustomAccordion({ triggerText, defaultValue = '', classNameTrigger, children }: CustomAccordionProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={defaultValue}>
            <AccordionItem value="item-1">
                <AccordionTrigger className={classNameTrigger}>{triggerText}</AccordionTrigger>
                <AccordionContent>{children}</AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
