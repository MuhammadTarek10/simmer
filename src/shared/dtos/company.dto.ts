import { CardDto } from './card.dto'

export interface CompanyDto {
  id: string | undefined
  name: string
  invoice_date: Date
  phone: string | undefined
  comment: string | undefined
  cards?: CardDto[]
}
