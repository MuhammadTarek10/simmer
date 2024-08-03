import NameCard from '@/components/NameCard'
import { Customer } from '@shared/models'
import { defer, Link, useLoaderData } from 'react-router-dom'
import { mockCustomers } from '../../../../shared/mocks/dummy'

export async function customersLoader() {
  return defer({ customers: mockCustomers })
}

const Customers = () => {
  const { customers } = useLoaderData() as { customers: Customer[] }

  return (
    <div className="gap-4">
      <div className="flex items-center p-2">
        {/* <BsThreeDotsVertical className="cursor-pointer" /> */}
        <h1 className="text-3xl font-bold">المشتركين</h1>
      </div>
      <div>
        <div className="name-list">
          {customers.map((customer) => (
            <Link key={customer.id} to={customer.id}>
              <NameCard name={customer.name} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Customers
