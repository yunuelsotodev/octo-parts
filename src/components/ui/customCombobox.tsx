"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

interface Props {
    list: Array<string>
}

export function CustomCombobox({list} : Props) {
  return (
    <Combobox items={list}>
      <ComboboxInput placeholder="Modelo" className={'w-full flex-1'}/>
      <ComboboxContent>
        <ComboboxEmpty>No se encontro.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
