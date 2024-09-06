import { InvoiceData } from '@shared/models'

const InvoiceCard = ({ invoices }: { invoices: InvoiceData }) => {
  const getLastPaid = (invoices: InvoiceData) => {
    const lastPaid = invoices.info.filter((element) => element.amount > 0)
    return lastPaid.length > 0 ? lastPaid[0].invoice_date : 'لم يتم الدفع'
  }

  const getAmountOfLastPaid = (invoices: InvoiceData) => {
    const lastPaid = invoices.info.filter((element) => element.amount > 0)
    return lastPaid.length > 0 ? lastPaid[0].amount : 'لم يتم الدفع'
  }

  return (
    <div className="bg-white shadow-md rounded-md p-4 space-y-2">
      <div className="flex justify-between">
        <h1 className="text-xl">الفاتورة الشهرية</h1>
        <h1 className="text-xl font-bold">{invoices.lastMonthTotal}</h1>
      </div>
      <div className="flex justify-between">
        <h1 className="text-xl">اخر دفع</h1>
        <h1 className="text-xl font-bold">{getAmountOfLastPaid(invoices)}</h1>
      </div>
      <div className="flex justify-between">
        <h1 className="text-xl">المتبقي</h1>
        <h1 className="text-xl font-bold">{invoices.total < 0 ? invoices.total : '0'}</h1>
      </div>
      <div className="flex justify-between">
        <h1 className="text-xl">تاريخ اخر دفع</h1>
        <h1 className="text-xl font-bold">{getLastPaid(invoices)}</h1>
      </div>
      <div className="flex justify-between">
        <h1 className="text-xl">عدد الخطوط</h1>
        <h1 className="text-xl font-bold">{invoices.info[0].customer.cards?.length}</h1>
      </div>
    </div>
  )
}
export default InvoiceCard
