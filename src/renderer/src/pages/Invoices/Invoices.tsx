import SearchInput from '@/components/SearchInput'
import { InvoiceData } from '@shared/models'
import { useEffect, useState } from 'react'
import { defer, useLoaderData } from 'react-router-dom'
import { getInvoicesGrouped } from '../../repositories/invoices.repository'
import InvoicesList from './components/InvoicesList'

export async function invoicesLoader() {
  const invoices = await getInvoicesGrouped()
  return defer({ invoices: invoices })
}
const Invoices = () => {
  const { invoices } = useLoaderData() as { invoices: InvoiceData[] }
  const [filteredData, setFilteredData] = useState<InvoiceData[]>(invoices)

  const [search, setSearch] = useState('')
  useEffect(() => {
    const filtered = invoices.filter((invoice) =>
      invoice.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredData(filtered)
  }, [search, invoices])

  return (
    <div className="p-2">
      <div className="h-full w-full p-2">
        <div className="flex items-center">
          <h1 className="flex text-3xl font-bold">الفواتير</h1>
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <InvoicesList invoices={filteredData} />
      </div>
    </div>
  )
}
export default Invoices
