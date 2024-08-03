export interface Company {
  id: string
  name: string
}

export interface CompanyInfo {
  id: string
  name: string
  phone?: string
  invoice_date?: string
  comment?: string
  cards?: CardInfo[]
}

export interface Customer {
  id: string
  name: string
}

export interface CustomerInfo {
  id: string
  name: string
  national_id: string
  grand_name: string
  address: string
  comment?: string
}

export interface CardInfo {
  id: string
  card_number: string
  card_type: string
  company_name: string
  offer_name?: string
  offer_end_date?: string
  price_before_vat: number
  price_after_vat: number
  comment?: string
}