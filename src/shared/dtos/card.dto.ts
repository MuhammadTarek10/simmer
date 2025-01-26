import { CompanyDto } from './company.dto'
import { CustomerDto } from './customer.dto'

export interface CardDto {
  id: string
  number: string
  price_before_vat: number
  price_after_vat: number
  comment: string | null
  company: CompanyDto | null
  customer: CustomerDto | null
}
