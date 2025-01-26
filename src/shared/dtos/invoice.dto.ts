import { CardDto } from './card.dto'
import { CustomerDto } from './customer.dto'

export interface InvoiceDto {
  id: string
  amount: number
  invoice_date: Date
  status: string
  customer: CustomerDto | null
  card?: CardDto | null
}
