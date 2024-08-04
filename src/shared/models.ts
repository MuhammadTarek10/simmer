export interface Company {
  id: string
  name: string
}

export interface CompanyInfo {
  id: string
  name: string
  invoice_date?: string
  phone?: string
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
  cards?: CardInfo[]
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

export interface ListInfo {
  customer_id: string
  name: string
  card_number: string
  company_name: string
  offer_name?: string
  invoice_date?: string
  paid?: number
  remaining?: number
  comment?: string
}

export interface ListData {
  month: string
  info: ListInfo[]
}

export interface OfferInfo {
  id: string
  name: string
  period_in_month: number
  percentage: number
  comment?: string
}

export interface InvoiceInfo {
  customer_name: string
  invoice_date: string
  amount: number
  comment?: string
}
