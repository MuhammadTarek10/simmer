import { requireAuth } from '@shared/actions/auth.actions'
import { InvoiceInfo } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'

export async function invoicesLoader() {
  await requireAuth()
  const invoices = await window.context.getInvoices()
  return defer({ invoices: invoices })
}
const Invoices = () => {
  const { invoices } = useLoaderData() as { invoices: InvoiceInfo[] }
  return <div>Invoices</div>
}
export default Invoices
