'use client'
import { useState } from 'react'
import { Field } from './field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'
import { SearchIcon } from 'lucide-react'

interface Props {
    searchFunction: (q: string) => void,
    placeholder?: string,
    animate: boolean,
    value: string
}

export default function SearchInput({ placeholder, searchFunction, animate, value }: Props) {

    const [active, setActive] = useState(false);

    return (
    <Field className={`${active ? 'max-w-sm' : `${animate ? 'w-0' : 'max-w-sm'}`} transition-all duration-500`}>
            <InputGroup>
                <InputGroupInput
                    value={value}
                    id="inline-start-input"
                    placeholder={placeholder ?? 'Buscar elemento...'}
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    onChange={(e) => searchFunction(e.target.value)}
                    onKeyDownCapture={(e) => {
                        if (e.key === 'Enter') {
                            setActive(false);
                            (e.target as HTMLInputElement).blur();
                        }
                    }}
                />
                <InputGroupAddon align="inline-start">
                    <SearchIcon className="text-black" size={36} />
                </InputGroupAddon>
            </InputGroup>
        </Field>
    )
}
