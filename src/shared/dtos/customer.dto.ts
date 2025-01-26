import { CardDto } from './card.dto'
import { InvoiceDto } from './invoice.dto'

export interface CustomerDto {
  id: string
  national_id: string
  fullname: string
  grand_name: string | null
  comment: string | null
  cards: CardDto[]
  invoices: InvoiceDto[]
  // extraInvoices: ExtraInvoice[]
}
