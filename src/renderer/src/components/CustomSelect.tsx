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
  onChange,
  className,
  addPlaceholder
}: {
  placeholder: string
  options?: DropDownOption[]
  onChange: (value: string) => void
  className?: string
  addPlaceholder?: boolean
}) => {
  return (
    <div className="flex p-2">
      <Select onValueChange={onChange}>
        <SelectTrigger className={className || 'flex justify-center items-center'}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {addPlaceholder && (
            <SelectItem key="placeholder" className={cn('cursor-pointer')} value={placeholder}>
              {placeholder}
            </SelectItem>
          )}
          {options &&
            options.map((option) => (
              <SelectItem
                key={option.name}
                className={cn('cursor-pointer', option.className)}
                value={option.value || option.name}
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
