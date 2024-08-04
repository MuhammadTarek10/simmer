import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/utils/utils'
import { DropDownOption } from '@shared/types'
import { BsThreeDotsVertical } from 'react-icons/bs'

const CustomDropDownMenu = ({ options }: { options?: DropDownOption[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsThreeDotsVertical size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 m-2">
        {options &&
          options.map((option) => (
            <DropdownMenuItem key={option.name} className={cn('cursor-pointer', option.className)}>
              <DropdownMenuLabel className="flex gap-2 w-full justify-between">
                {option.icon && option.icon}
                {option.name}
              </DropdownMenuLabel>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default CustomDropDownMenu
