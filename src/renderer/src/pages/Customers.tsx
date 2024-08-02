import CustomerCard from '@/components/CustomerCard'
import { Customer } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'
import { mockCustomers } from '../mocks/dummy'

export async function customersLoader() {
  return defer({ customers: mockCustomers })
}

const Customers = () => {
  const { customers } = useLoaderData() as { customers: Customer[] }
  return customers.map((customer) => <CustomerCard key={customer.id} customer={customer} />)
}
export default Customers
