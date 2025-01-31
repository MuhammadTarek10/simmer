import { Column } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { cn } from '@lib/utils'
import { Button } from '@shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@shadcn/ui/dropdown-menu'

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  sort?: boolean
  className?: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  sort = true,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!sort) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('items-center space-x-2', className)}>
      <Button
        variant="ghost"
        className="text-[20px]"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
