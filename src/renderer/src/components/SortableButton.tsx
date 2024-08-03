/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from './ui/button'

const SortableButton = ({ column, title }: { column: Column<any, unknown>; title: string }) => {
  return (
    <Button
      variant="ghost"
      className="text-xl"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}
export default SortableButton
