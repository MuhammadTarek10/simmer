import { InvoiceData } from '@shared/models'
import InvoiceCard from './InvoiceCard'

const InvoicesList = ({ invoices }: { invoices: InvoiceData[] }) => {
  return (
    <div className="flex flex-col">
      {invoices.map((invoice) => (
        <div key={invoice.name} className="p-2">
          <h1 className="text-2xl font-bold">{invoice.name}</h1>
          <hr className="my-2 border-gray-300" />
          <InvoiceCard invoices={invoice} />
        </div>
      ))}
    </div>
  )
}
export default InvoicesList
