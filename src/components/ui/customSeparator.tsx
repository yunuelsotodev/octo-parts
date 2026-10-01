import React from 'react'

interface Props {
    text?: string
}

export const CustomSeparator = ({ text }: Props) => {
    return (
        <div className='flex flex-row items-center gap-1'>
            <span className='h-px bg-secondary flex-1'></span>
            <span className='text-secondary'>{text}</span>
            <span className='h-px bg-secondary flex-1'></span>
        </div>
    )
}
