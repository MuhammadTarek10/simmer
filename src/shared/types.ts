import {
  CardInfo,
  CompanyInfo,
  CustomerInfo,
  InvoiceData,
  InvoiceInfo,
  ListData,
  OfferInfo
} from './models'

export interface DropDownOption {
  name: string
  className?: string
  icon?: React.ReactNode
  render?: React.ReactNode
  onClick?: () => void
  value?: string
}

export interface TableActionButtonProps {
  title: string
  children: React.ReactNode[]
}

export interface CustomDialogProps {
  placeholder?: string
  placeholderClassName?: string
  title: string
  titleClassName?: string
  description: string
  confirmText: string
  confirmClassName?: string
  cancelText: string
  cancelClassName?: string
  icon?: React.ReactNode
  onConfirm: () => void
}

// * Company
export type GetCompanies = () => Promise<CompanyInfo[]>
export type GetCompany = (id: string) => Promise<CompanyInfo>
export type AddCompany = (company: CompanyInfo) => Promise<void>
export type UpdateCompany = (company: CompanyInfo) => Promise<void>
export type DeleteCompany = (id: string) => Promise<void>

// * Customer
export type GetCustomers = () => Promise<CustomerInfo[]>
export type GetCustomer = (id: string) => Promise<CustomerInfo>
export type GetCustomerFromInvoiceId = (id: string) => Promise<CustomerInfo>
export type AddCustomer = (customer: CustomerInfo) => Promise<void>
export type UpdateCustomer = (customer: CustomerInfo) => Promise<void>
export type DeleteCustomer = (id: string) => Promise<void>
export type RemoveCardFromCustomer = (cardId: string, customerId: string) => Promise<void>

// * Cards
export type GetCards = () => Promise<CardInfo[]>
export type GetCard = (id: string) => Promise<CardInfo>
export type GetUnOccupiedCards = () => Promise<CardInfo[]>
export type GetCardsFromCompanyId = (id: string) => Promise<CardInfo[]>
export type GetCardsFromCustomerId = (id: string) => Promise<CardInfo[]>
export type AddCard = (card: CardInfo) => Promise<void>
export type UpdateCard = (card: CardInfo) => Promise<void>
export type DeleteCard = (id: string) => Promise<void>

// * List
export type GetList = (all: boolean) => Promise<ListData[]>

// * Invoices
export type UpdatePaymentInvoices = () => Promise<void>
export type GetInvoices = () => Promise<InvoiceInfo[]>
export type GetInvoicesByCustomerId = (id: string) => Promise<InvoiceData>
export type GetInvoice = (id: string) => Promise<InvoiceInfo>
export type AddInvoice = (invoice: InvoiceInfo) => Promise<void>
export type UpdateInvoice = (invoice: InvoiceInfo) => Promise<void>
export type DeleteInvoice = (id: string) => Promise<void>

// * Offers
export type GetOffers = () => Promise<OfferInfo[]>
export type GetOffer = (id: string) => Promise<OfferInfo>
export type AddOffer = (offer: OfferInfo) => Promise<void>
export type UpdateOffer = (offer: OfferInfo) => Promise<void>
export type DeleteOffer = (id: string) => Promise<void>

// * File
export interface FileSchema {
  name: string
  national_id: string
  grand_name: string
  address: string
  card_number: string
  company: string
  company_invoice_date: string
  card_start_date: string
  price_before_vat: number
  price_after_vat: number
  offer_name: string
  offer_end_date: string
  offer_percentage: number
  paid: number
}

export type FileImport = () => Promise<void>
