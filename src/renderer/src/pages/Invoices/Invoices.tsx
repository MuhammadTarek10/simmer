import SearchInput from '@/components/SearchInput'
import { requireAuth } from '@shared/actions/auth.actions'
import { InvoiceInfo } from '@shared/models'
import { useEffect, useState } from 'react'
import { defer, useLoaderData } from 'react-router-dom'
import InvoiceCard from './components/InvoiceCard'

export async function invoicesLoader() {
  await requireAuth()
  const invoices = await window.context.getInvoices()
  return defer({ invoices: invoices })
}
const Invoices = () => {
  const { invoices } = useLoaderData() as { invoices: InvoiceInfo[] }
  const [filteredData, setFilteredData] = useState(invoices)

  const [search, setSearch] = useState('')
  useEffect(() => {
    const filtered = invoices.filter((invoice) =>
      invoice.customer.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredData(filtered)
  }, [search, invoices])

  return (
    <div className="h-full w-full p-2">
      <div className="flex items-center">
        <h1 className="flex text-3xl font-bold ml-8">الفواتير</h1>
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {filteredData.map((invoice) => (
          <div key={invoice.id} className="p-2">
            <InvoiceCard invoice={invoice} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Invoices
