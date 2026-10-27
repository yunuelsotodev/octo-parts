"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { Option } from "@/interfaces/option"

interface Props {
  options: Option[]
  emptyValue: string,
  placeholder: string,
  selected: string[],
  handleChange: (value: string[], name: string) => void,
  name?: string
}

export function ComboboxMultiple({ options, emptyValue = 'Not found item.', placeholder, selected, handleChange, name }: Props) {
  const anchor = useComboboxAnchor();

  return (
    <Combobox
      multiple
      items={options}
      autoHighlight
      defaultValue={[]}    
      value={selected}
      onValueChange={(e) => handleChange(e, name ?? 'combobox')}
    >
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>
                  {value}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder={placeholder} />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>{emptyValue}</ComboboxEmpty>
        <ComboboxList>
          {(item: Option) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
