import { CustomerDto } from '@shared/dtos/customer.dto'

export interface ICustomerService {
  getCustomers(): Promise<CustomerDto[]>
  getCustomerById(id: string): Promise<CustomerDto>
  createCustomer(customer: CustomerDto): Promise<CustomerDto>
  updateCustomer(id: string, customer: CustomerDto): Promise<CustomerDto>
  deleteCustomer(id: string): Promise<void>
  transferCard(receiver_id: string, card_id: string): Promise<void>
}
