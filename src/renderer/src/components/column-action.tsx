import React from 'react'

import { MoreHorizontal } from 'lucide-react'
import { Button } from '@shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@shadcn/ui/dropdown-menu'

type Action = {
  callback: (element: any) => void
  label: string
}

export const ColumnAction = ({ element, actions }: { element: any; actions: Action[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <div key={index}>
            <DropdownMenuItem onClick={() => action.callback(element)}>
              {action.label}
            </DropdownMenuItem>
            {index < actions.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
