import { cn } from '@/utils/utils'
import { useState } from 'react'
import { DialogProps } from '../../../../shared/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'

const BasicDialog = ({
  placeholder,
  placeholderClassName,
  title,
  titleClassName,
  description,
  confirmText,
  confirmClassName,
  cancelText,
  cancelClassName,
  icon,
  onConfirm
}: DialogProps) => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className={
          placeholderClassName || 'flex p-2 w-full justify-between hover:bg-action/20 rounded-lg'
        }
      >
        {icon}
        {placeholder}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex w-full items-center">
          <AlertDialogTitle className={cn(titleClassName, 'text-2xl')}>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-lg text-black">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full gap-4">
          <AlertDialogAction className={cn(confirmClassName, 'flex flex-1')} onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
          <AlertDialogCancel
            className={cn(cancelClassName, 'flex flex-1')}
            onClick={() => setOpen(false)}
          >
            {cancelText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default BasicDialog
