import NameCard from '@/components/NameCard'
import { Customer } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'
import { mockCustomers } from '../../mocks/dummy'

export async function customersLoader() {
  return defer({ customers: mockCustomers })
}

const Customers = () => {
  const { customers } = useLoaderData() as { customers: Customer[] }
  return (
    <div className="gap-4">
      <div className="flex items-center justify-end p-2">
        {/* <BsThreeDotsVertical className="cursor-pointer" /> */}
        <h1 className="text-3xl font-bold">المشتركين</h1>
      </div>
      <div>
        <div className="name-list">
          {customers.map((customer) => (
            <NameCard key={customer.id} name={customer.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Customers
