export interface CardDto {
  id: string
  number: string
  price_before_vat: number
  price_after_vat: number
  comment: string | null
  company_id: string
  customer_id: string | null
}
