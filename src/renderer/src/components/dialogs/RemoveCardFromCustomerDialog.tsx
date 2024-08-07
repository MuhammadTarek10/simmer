import BasicDialog from './BasicDialog'

const RemoveCardFromCustomerDialog = ({ onClick }: { onClick: () => void }) => {
  return (
    <BasicDialog
      placeholder="إزالة الخط"
      placeholderClassName="p-2 hover:bg-failure/25 rounded-lg"
      title="هل أنت متأكد؟"
      description="سيتم إزالة الخط من العميل"
      confirmText="إزالة"
      confirmClassName="bg-failure"
      cancelText="إلغاء"
      onConfirm={onClick}
    />
  )
}
export default RemoveCardFromCustomerDialog
