import { requireAuth } from '@shared/auth.actions'
import { Customer } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'

export async function customerDetailsLoader({ params }) {
  console.log(params)
  await requireAuth()
  return defer({ customer: { id: '2024', name: 'Ahmed' } })
}

const CustomerDetails = () => {
  const { customer } = useLoaderData() as { customer: Customer }
  return <div>{customer.name}</div>
}
export default CustomerDetails
