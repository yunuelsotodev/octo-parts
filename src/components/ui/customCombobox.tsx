"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Option } from "@/interfaces/option"

interface Props {
  list: Option[]
  value?: string | null
  onChange?: (value: string) => void
  invalid?: boolean
  placeholder?: string
  functionChange?: (value: string) => void
}

export function CustomCombobox({ list, value, onChange, invalid, placeholder = "Modelo", functionChange }: Props) {

  const onSelected = (value: string|null): void => {
    onChange?.(value ?? '');    
    functionChange?.(value ?? '');
  }

  return (
    <Combobox items={list} value={value ?? ''} onValueChange={(v) => onSelected(v)}>
      <ComboboxInput placeholder={placeholder} className={'w-full flex-1'} aria-invalid={invalid || undefined} />
      <ComboboxContent>
        <ComboboxEmpty>No se encontro.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
