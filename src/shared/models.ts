export interface CompanyInfo {
  id?: string
  name: string
  invoice_date?: string
  phone?: string
  comment?: string
  cards?: CardInfo[]
}

export interface CustomerInfo {
  id?: string
  name: string
  national_id: string
  grand_name: string
  address: string
  cards?: CardInfo[]
  comment?: string
}

export interface CardInfo {
  id?: string
  card_number: string
  card_type: string
  start_date: string
  company: CompanyInfo
  offer?: OfferInfo
  customer?: CustomerInfo
  offer_end_date?: string
  price_before_vat: string
  price_after_vat: string
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
  id?: string
  name: string
  period_in_month: string
  percentage: string
  comment?: string
}

export interface InvoiceInfo {
  id: string
  customer: CustomerInfo
  invoice_date: string
  amount: number
  comment?: string
}
