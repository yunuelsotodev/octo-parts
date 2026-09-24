import React from 'react'

interface Props {
    text?: string
}

export const CustomSeparator = ({text} : Props) => {
    return (
        <div className='flex flex-row gap-1 items-center'>
            <span className='bg-white h-px w-full'></span>
            <span className='text-white'>{text}</span>
            <span className='bg-white h-px w-full'></span>
        </div>
    )
}
