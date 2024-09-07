import icon from '@/assets/icons/customer-on.svg'
import NameCard from '@/components/NameCard'
import SearchInput from '@/components/SearchInput'
import { CustomerInfo } from '@shared/models'
import { useEffect, useState } from 'react'
import { defer, Link, useLoaderData } from 'react-router-dom'
import { getCustomers } from '../../repositories/customer.repository'

export async function customersLoader() {
  const customers = await getCustomers()
  return defer({ customers: customers })
}

const Customers = () => {
  const { customers } = useLoaderData() as { customers: CustomerInfo[] }
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState<CustomerInfo[]>(customers)

  useEffect(() => {
    const filtered = customers.filter((customer) => {
      const nameMatches = customer.name.toLowerCase().includes(search.toLowerCase())
      const cardNumberMatches = customer.cards?.some((card) => card.card_number.includes(search))

      return nameMatches || cardNumberMatches
    })
    setFilteredData(filtered)
  }, [search, customers])

  return (
    <div className="p-2">
      <div className="gap-4">
        <div className="flex items-center p-2 gap-4">
          {/* <BsThreeDotsVertical className="cursor-pointer" /> */}
          <h1 className="text-3xl font-bold">المشتركين</h1>
          <SearchInput
            placeholder="ابحث بالاسم او بالرقم"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
    </div>
  )
}
export default Customers
