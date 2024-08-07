import { BsTrash } from 'react-icons/bs'
import BasicDialog from './BasicDialog'

const DeleteDialog = ({
  placeholder,
  title,
  description,
  onConfirm
}: {
  placeholder: string
  title: string
  description: string
  onConfirm: () => void
}) => {
  return (
    <BasicDialog
      placeholder={placeholder}
      title={title}
      confirmText="حذف"
      cancelText="إلغاء"
      description={description}
      icon={<BsTrash size={20} />}
      onConfirm={onConfirm}
    />
  )
}
export default DeleteDialog
