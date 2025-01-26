import { CustomerDto } from '@shared/dtos/customer.dto'

export class CustomerController {
  public static async getCustomers(): Promise<CustomerDto[]> {
    return await window.context.getCustomers()
  }

  public static async getCustomerById(id: string): Promise<CustomerDto> {
    return await window.context.getCustomerById(id)
  }

  public static async updateCustomer(id: string, customer: CustomerDto): Promise<CustomerDto> {
    return await window.context.updateCustomer(id, customer)
  }

  public static async deleteCustomer(id: string): Promise<void> {
    await window.context.deleteCustomer(id)
  }

  public static async createCustomer(customer: CustomerDto): Promise<CustomerDto> {
    return await window.context.createCustomer(customer)
  }
}
