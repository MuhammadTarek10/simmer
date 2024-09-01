import { InvoiceInfo } from '@shared/models'

const InvoiceCard = ({ invoice }: { invoice: InvoiceInfo }) => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold">العميل</div>
          <div className="text-lg font-bold">{invoice.customer.name}</div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold">المدفوع</div>
          <div className="text-lg font-bold">{invoice.amount}</div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold">التاريخ</div>
          <div className="text-lg font-bold">{invoice.invoice_date}</div>
        </div>
      </div>
    </div>
  )
}
export default InvoiceCard
