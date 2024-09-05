import InvoiceForm from '@/components/forms/InvoiceForm'
import { CustomerInfo, InvoiceData, InvoiceInfo } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'
import { updatePaymentInvoices } from '../../repositories/invoices'

export async function addCustomerInvoiceLoader({ params }) {
  const { id } = params
  await updatePaymentInvoices()
  const customer = await window.context.getCustomer(id)
  const invoices = await window.context.getInvoicesByCustomerId(id)

  return defer({ customer: customer, invoices: invoices[0] })
}

const AddCustomerInvoice = ({ invoice }: { invoice?: InvoiceInfo }) => {
  const { customer, invoices } = useLoaderData() as {
    customer: CustomerInfo
    invoices: InvoiceData
  }

  const getLastPaid = (invoices: InvoiceData) => {
    const lastPaid = invoices.info.filter((element) => element.amount > 0)
    return lastPaid.length > 0 ? lastPaid[0].invoice_date : 'لم يتم الدفع'
  }

  const getAmountOfLastPaid = (invoices: InvoiceData) => {
    const lastPaid = invoices.info.filter((element) => element.amount > 0)
    return lastPaid.length > 0 ? lastPaid[0].amount : 'لم يتم الدفع'
  }

  return (
    <div className="flex flex-col m-4">
      <InvoiceForm
        customer={customer}
        invoice={invoice}
        total={invoices.total}
        lastPaid={getLastPaid(invoices).toString()}
        lastAmountPaid={getAmountOfLastPaid(invoices).toString()}
      />
    </div>
  )
}
export default AddCustomerInvoice
