import InvoiceForm from '@/components/forms/InvoiceForm'
import { CustomerInfo, InvoiceInfo } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'

export async function addCustomerInvoiceLoader({ params }) {
  const { id } = params
  const customer = await window.context.getCustomer(id)

  return defer({ customer: customer })
}

const AddCustomerInvoice = ({ invoice }: { invoice?: InvoiceInfo }) => {
  const { customer } = useLoaderData() as { customer: CustomerInfo }

  return (
    <div className="flex flex-col m-4">
      <InvoiceForm customer={customer} invoice={invoice} />
    </div>
  )
}
export default AddCustomerInvoice
