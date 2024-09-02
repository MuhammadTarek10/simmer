import { InvoiceInfo } from '@shared/models'
import { EditIcon, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const InvoiceCard = ({ invoice }: { invoice: InvoiceInfo }) => {
  const navigate = useNavigate()

  const editInvoice = () => {
    navigate(`/edit/${invoice.id}/invoice`)
  }

  const deleteInvoice = async () => {
    await window.context.deleteInvoice(invoice.id!)
    window.location.reload()
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center mt-2 w-full justify-between">
          <div className="text-2xl font-bold">{invoice.customer.name}</div>
          <div className="flex justify-end cursor-pointer">
            <EditIcon onClick={editInvoice} />
            <Trash2 onClick={deleteInvoice} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg">المدفوع</div>
          <div className="text-lg font-bold">{invoice.amount}</div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg">التاريخ</div>
          <div className="text-lg font-bold">{invoice.invoice_date}</div>
        </div>
      </div>
    </div>
  )
}
export default InvoiceCard
