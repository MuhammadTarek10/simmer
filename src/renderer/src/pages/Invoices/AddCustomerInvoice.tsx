import InvoiceForm from '@/components/forms/InvoiceForm'
import { CustomerInfo, InvoiceData, InvoiceInfo } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'
import { getCustomer } from '../../repositories/customer.repository'
import {
  getInvoicesByCustomerId,
  updatePaymentInvoices
} from '../../repositories/invoices.repository'

export async function addCustomerInvoiceLoader({ params }) {
  const { id } = params
  await updatePaymentInvoices()
  const customer = await getCustomer(id)
  const invoices = await getInvoicesByCustomerId(id)

  return defer({ customer: customer, invoices: invoices.length > 0 ? invoices[0] : null })
}

const AddCustomerInvoice = ({ invoice }: { invoice?: InvoiceInfo }) => {
  const { customer, invoices } = useLoaderData() as {
    customer: CustomerInfo
    invoices: InvoiceData | null
  }

  const getLastPaid = (invoices: InvoiceData): string => {
    const lastPaid = invoices.info.filter((element) => element.amount > 0)

    if (lastPaid.length <= 0) return 'لم يتم الدفع'

    return lastPaid[0].invoice_date ?? 'لم يتم الدفع'
  }

  const getAmountOfLastPaid = (invoices: InvoiceData): string => {
    const lastPaid = invoices.info.filter((element) => element.amount > 0)

    if (lastPaid.length <= 0) return 'لم يتم الدفع'

    return lastPaid[0].amount.toString()
  }

  return (
    <div className="flex flex-col m-4">
      <InvoiceForm
        customer={customer}
        invoice={invoice}
        total={invoices === null ? 0 : invoices.total}
        lastPaid={invoices === null ? 'لم يتم الدفع' : getLastPaid(invoices)}
        lastAmountPaid={invoices === null ? 'لم يتم الدفع' : getAmountOfLastPaid(invoices)}
      />
    </div>
  )
}
export default AddCustomerInvoice
