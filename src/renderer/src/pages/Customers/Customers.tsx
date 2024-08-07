import icon from '@/assets/icons/customer-on.svg'
import NameCard from '@/components/NameCard'
import { requireAuth } from '@shared/actions/auth.actions'
import { CustomerInfo } from '@shared/models'
import { defer, Link, useLoaderData } from 'react-router-dom'

export async function customersLoader() {
  await requireAuth()
  const customers = await window.context.getCustomers()
  return defer({ customers: customers })
}

const Customers = () => {
  const { customers } = useLoaderData() as { customers: CustomerInfo[] }

  return (
    <div className="gap-4">
      <div className="flex items-center p-2">
        {/* <BsThreeDotsVertical className="cursor-pointer" /> */}
        <h1 className="text-3xl font-bold">المشتركين</h1>
      </div>
      <div>
        <div className="name-list">
          {customers.map((customer) => (
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
