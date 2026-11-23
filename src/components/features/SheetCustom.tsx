import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { JSX } from 'react/jsx-runtime'

interface Props {
    side?: 'top' | 'bottom' | 'right' | 'left',
    title: string,
    description?: string,
    body: JSX.Element,
    button?: JSX.Element,
    open?: boolean,
    onOpenChange?: (value: boolean) => void
}

export default function SheetCustom({ side = 'bottom', title, description, body, button, open, onOpenChange }: Props) {    
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = open !== undefined;
    const dialogOpen = isControlled ? open : internalOpen;
    
    const handleOpenChange = (nextOpen: boolean) => {
        if (!isControlled) setInternalOpen(nextOpen);
        onOpenChange?.(nextOpen);
    };
    
    return (
        <Sheet open={dialogOpen} onOpenChange={handleOpenChange}>
            {
                button && (
                    <SheetTrigger render={button} />
                )
            }
            <SheetContent side={side}>
                <SheetHeader>
                    <SheetTitle className='text-lg'>{title}</SheetTitle>
                    {
                        description && (
                            <SheetDescription>
                                {description}
                            </SheetDescription>
                        )

                    }
                </SheetHeader>
                {body}
            </SheetContent>
        </Sheet>
    )
}
