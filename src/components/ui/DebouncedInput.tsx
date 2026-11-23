'use client'
import { useEffect, useRef, type ComponentProps } from 'react'
import { Input } from './input'

interface Props extends Omit<ComponentProps<'input'>, 'value' | 'defaultValue' | 'onChange'> {
    value: string,
    onValueChange: (value: string) => void,
    delay?: number,
}

export function DebouncedInput({ value, onValueChange, delay = 300, ...props }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const onValueChangeRef = useRef(onValueChange);

    useEffect(() => {
        onValueChangeRef.current = onValueChange;
    }, [onValueChange]);

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
            onValueChangeRef.current(nextValue);
        }, delay);
    };

    return (
        <Input
            {...props}
            ref={inputRef}
            defaultValue={value}
            onChange={(event) => handleChange(event.target.value)}
        />
    )
}
