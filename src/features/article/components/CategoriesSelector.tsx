import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/ui/select"

type Option = {
  label: string
  value: string
}

type CategoriesSelectorProps = {
  options?: Option[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
}

function CategoriesSelector({
  options = [],
  value,
  placeholder = "Select",
  onChange,
  className,
}: CategoriesSelectorProps) {
  return (

    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent position="popper" sideOffset={4}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    
  )
}

export default CategoriesSelector