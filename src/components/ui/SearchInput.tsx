'use client'
import { useEffect, useRef, useState } from 'react'
import { Field } from './field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'
import { SearchIcon } from 'lucide-react'

interface Props {
    searchFunction: (q: string) => void,
    placeholder?: string,
    animate: boolean,
    value: string,
    delay?: number,
}

export default function SearchInput({ placeholder, searchFunction, animate, value, delay = 300 }: Props) {

    const [active, setActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchFunctionRef = useRef(searchFunction);

    useEffect(() => {
        searchFunctionRef.current = searchFunction;
    }, [searchFunction]);

    useEffect(() => {
        const input = inputRef.current;

        if (input && document.activeElement !== input && input.value !== value) {
            input.value = value;
        }
    }, [value]);

    useEffect(() => {
        return () => {
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, []);

    const handleChange = (nextValue: string) => {
        if (timeout.current) clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            searchFunctionRef.current(nextValue);
        }, delay);
    };

    return (
    <Field className={`${active ? 'max-w-sm' : `${animate ? 'w-0' : 'max-w-sm'}`} transition-all duration-500`}>
            <InputGroup>
                <InputGroupInput
                    ref={inputRef}
                    defaultValue={value}
                    id="inline-start-input"
                    placeholder={placeholder ?? 'Buscar elemento...'}
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDownCapture={(e) => {
                        if (e.key === 'Enter') {
                            if (timeout.current) clearTimeout(timeout.current);
                            searchFunctionRef.current(e.currentTarget.value);
                            setActive(false);
                            e.currentTarget.blur();
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
