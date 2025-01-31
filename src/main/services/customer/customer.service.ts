import { CustomerDto } from '@shared/dtos/customer.dto'
import { ICustomerService } from '@shared/interfaces/icustomer.service'
import { context } from '@shared/database/db-context'
import { CustomerMapper } from '@/mappers/customer.mapper'
import { Prisma } from '@prisma/client'

export class CustomerService implements ICustomerService {
  async getCustomers(): Promise<CustomerDto[]> {
    const customers = await context.customer.findMany({
      include: {
        cards: true
      }
    })

    return CustomerMapper.toDtos(customers)
  }

  async getCustomerById(id: string): Promise<CustomerDto> {
    const customer = await context.customer.findUnique({
      where: { id },
      include: {
        cards: true,
        invoices: true
      }
    })

    if (!customer) throw new Error('Customer not found')

    return CustomerMapper.toDto(customer)
  }

  async createCustomer(customer: CustomerDto): Promise<CustomerDto> {
    const createdCustomer = await context.customer.create({
      data: CustomerMapper.toModel(customer) as Prisma.CustomerCreateInput
    })

    return CustomerMapper.toDto(createdCustomer)
  }

  async updateCustomer(id: string, customer: CustomerDto): Promise<CustomerDto> {
    const updatedCustomer = await context.customer.update({
      where: {
        id
      },
      data: CustomerMapper.toModel(customer)
    })

    return CustomerMapper.toDto(updatedCustomer)
  }

  async deleteCustomer(id: string): Promise<void> {
    await context.customer.delete({
      where: {
        id
      }
    })
  }

  async transferCard(receiver_id: string, card_id: string): Promise<void> {
    await context.card.update({
      where: { id: card_id },
      data: { customer_id: receiver_id }
    })
  }
}
