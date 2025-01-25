import { Card, Customer, Invoice } from '@prisma/client'
import { InvoiceDto } from '@shared/dtos/invoice.dto'
import { CardMapper } from './card.mapper'
import { Decimal } from '@prisma/client/runtime/library'
import { CustomerMapper } from './customer.mapper'

interface InvoiceWithRelations extends Invoice {
  card: Card
  customer: Customer
}

export class InvoiceMapper {
  public static toDtos(invoices: Invoice[]): InvoiceDto[] {
    return invoices.map((invoice: Invoice) => InvoiceMapper.toDto(invoice))
  }

  public static toDto(invoice: Invoice | InvoiceWithRelations): InvoiceDto {
    return {
      id: invoice.id,
      card: 'card' in invoice ? CardMapper.toDto(invoice.card) : null,
      customer: 'customer' in invoice ? CustomerMapper.toDto(invoice.customer) : null,
      invoice_date: invoice.invoice_date,
      amount: Number(invoice.amount),
      type: invoice.type
    }
  }

  public static toModel(invoice: Partial<InvoiceDto>): Partial<Invoice> {
    return {
      id: invoice.id,
      // card_id: invoice.card_id,
      // customer_id: invoice.customer_id,
      invoice_date: invoice.invoice_date,
      amount: new Decimal(invoice.amount ?? 0)
    }
  }
}
