import icon from '@/assets/icons/customer-on.svg'
import NameCard from '@/components/NameCard'
import SearchInput from '@/components/SearchInput'
import { CustomerInfo } from '@shared/models'
import { useEffect, useState } from 'react'
import { defer, Link, useLoaderData } from 'react-router-dom'

export async function customersLoader() {
  const customers = await window.context.getCustomers()
  return defer({ customers: customers })
}

const Customers = () => {
  const { customers } = useLoaderData() as { customers: CustomerInfo[] }
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState<CustomerInfo[]>([])

  useEffect(() => {
    if (search) {
      const filtered = customers.filter((customer) => customer.name === search.toLowerCase())
      setFilteredData(filtered)
    } else {
      setFilteredData([])
    }
  }, [search, customers])

  return (
    <div className="gap-4">
      <div className="flex items-center p-2 gap-4">
        {/* <BsThreeDotsVertical className="cursor-pointer" /> */}
        <h1 className="text-3xl font-bold ml-8">المشتركين</h1>
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        <div className="name-list">
          {filteredData.map((customer) => (
            <Link key={customer.id!} to={customer.id!}>
              <NameCard name={customer.name} icon={icon} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Customers
