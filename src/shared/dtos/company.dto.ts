import { CardDto } from './card.dto'

export interface CompanyDto {
  id: string
  name: string
  invoice_date: Date
  phone: string | null
  comment: string | null
  cards: CardDto[]
}
