import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Option } from "@/interfaces/option"

interface Props {
  options: Option[],
  title?: string,
  onChange?: (value: string) => void,
  invalid?: boolean,
  value?: string | null
}

export function CustomSelect({options, title, value, invalid, onChange} : Props) {
  return (
    <Select items={options} value={value ?? ''} onValueChange={(v) => onChange?.(v ?? '')}>
      <SelectTrigger className="w-full" aria-invalid={invalid || undefined}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {options.map((item) => (
            <SelectItem key={item.value} value={`${item.value}`}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
