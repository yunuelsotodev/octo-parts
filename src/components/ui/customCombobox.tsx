"use client"

import { useState } from "react"
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
  /**
   * Permite conservar en el input el texto escrito aunque no coincida con
   * ningún elemento de la lista.
   */
  allowCustomValue?: boolean
}

export function CustomCombobox({ list, value, onChange, invalid, placeholder = "Modelo", functionChange, allowCustomValue = false }: Props) {
  const currentValue = value ?? '';
  const [inputText, setInputText] = useState(currentValue);
  const [syncedValue, setSyncedValue] = useState(currentValue);

  if (allowCustomValue && currentValue !== syncedValue) {
    setSyncedValue(currentValue);
    setInputText(currentValue);
  }

  const handleSelected = (nextValue: string | null): void => {
    const selectedValue = nextValue ?? '';

    if (allowCustomValue) {
      setInputText(selectedValue);
    }

    onChange?.(selectedValue);
    functionChange?.(selectedValue);
  }

  const handleInputChange = (nextValue: string, details?: { reason?: string }): void => {
    // Base UI limpia el input al cerrar cuando no hay una selección válida.
    // Con allowCustomValue conservamos el texto que escribió el usuario.
    if (details?.reason === 'input-clear' && nextValue === '' && inputText !== '') {
      return;
    }

    setInputText(nextValue);
    onChange?.(nextValue);
  }

  return (
    <Combobox
      items={list}
      value={currentValue}
      onValueChange={(nextValue) => handleSelected(nextValue)}
      {...(allowCustomValue && {
        inputValue: inputText,
        onInputValueChange: handleInputChange,
      })}
    >
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
