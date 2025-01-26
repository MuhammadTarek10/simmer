import { Card, Customer, ExtraInvoice, Invoice } from '@prisma/client'
import { CustomerDto } from '@shared/dtos/customer.dto'
import { InvoiceMapper } from './invoice.mapper'
import { CardMapper } from './card.mapper'

interface CustomerWithRelations extends Customer {
  cards: Card[]
  invoices: Invoice[]
  extraInvoices: ExtraInvoice[]
}

export class CustomerMapper {
  public static toDtos(customers: Customer[]): CustomerDto[] {
    return customers.map((customer: Customer) => CustomerMapper.toDto(customer))
  }

  public static toDto(customer: Customer | CustomerWithRelations): CustomerDto {
    return {
      id: customer.id,
      national_id: customer.national_id,
      fullname: customer.fullname,
      grand_name: customer.grand_name,
      comment: customer.comment,
      cards: 'cards' in customer ? CardMapper.toDtos(customer.cards) : [],
      invoices: 'invoices' in customer ? InvoiceMapper.toDtos(customer.invoices) : []
    }
  }

  public static toModel(customer: Partial<CustomerDto>): Partial<Customer> {
    return {
      id: customer.id,
      national_id: customer.national_id,
      fullname: customer.fullname,
      grand_name: customer.grand_name,
      comment: customer.comment
    }
  }
}
