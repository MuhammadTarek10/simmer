import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/utils/utils'
import { DropDownOption } from '@shared/types'

const CustomSelect = ({
  placeholder,
  options,
  onChange
}: {
  placeholder: string
  options?: DropDownOption[]
  onChange: (value: string) => void
}) => {
  return (
    <div className="flex p-2">
      <Select onValueChange={onChange}>
        <SelectTrigger className="flex justify-center items-center">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options &&
            options.map((option) => (
              <SelectItem
                key={option.name}
                className={cn('cursor-pointer', option.className)}
                value={option.name}
              >
                {option.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
export default CustomSelect
