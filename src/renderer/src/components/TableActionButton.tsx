import { CustomDialogProps } from '@shared/types'
import { Link } from 'react-router-dom'
import BasicDialog from './dialogs/BasicDialog'

const TableActionButton = ({
  title,
  href,
  className,
  dialogProps
}: {
  title: string
  href?: string
  className?: string
  dialogProps?: CustomDialogProps
}) => {
  if (!dialogProps) {
    return (
      <Link to={href!} className={className}>
        {title}
      </Link>
    )
  }
  const {
    placeholder,
    placeholderClassName,
    title: dialogTitle,
    description,
    confirmText,
    confirmClassName,
    cancelText,
    onConfirm
  } = dialogProps

  return (
    <div>
      <BasicDialog
        placeholder={placeholder}
        placeholderClassName={placeholderClassName}
        title={dialogTitle}
        description={description}
        confirmText={confirmText}
        confirmClassName={confirmClassName}
        cancelText={cancelText}
        onConfirm={onConfirm}
      />
    </div>
  )
}
export default TableActionButton
