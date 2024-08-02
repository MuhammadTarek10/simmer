import { Customer } from '@shared/models'

const CustomerCard = ({ customer }: { customer: Customer }) => {
  return (
    <div>
      <h3>{customer.name}</h3>
    </div>
  )
}
export default CustomerCard
