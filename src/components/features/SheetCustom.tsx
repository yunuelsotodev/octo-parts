import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { JSX } from 'react/jsx-runtime'
import { IconType } from 'react-icons/lib'

interface Props {
    side?: 'top' | 'bottom' | 'right' | 'left',
    title: string,
    description?: string,
    body: JSX.Element,
    button?: JSX.Element,
}

export default function SheetCustom({ side = 'bottom', title, description, body, button }: Props) {    
    return (
        <Sheet>
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
