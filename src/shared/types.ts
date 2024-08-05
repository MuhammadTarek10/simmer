import { CardInfo, CompanyInfo, CustomerInfo, InvoiceInfo, ListData, OfferInfo } from './models'

export interface DropDownOption {
  name: string
  className?: string
  icon?: React.ReactNode
  render?: React.ReactNode
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
export type AddCustomer = (customer: CustomerInfo) => Promise<void>
export type UpdateCustomer = (customer: CustomerInfo) => Promise<void>
export type DeleteCustomer = (id: string) => Promise<void>

// * Cards
export type GetCards = () => Promise<CardInfo[]>
export type GetCard = (id: string) => Promise<CardInfo>
export type AddCard = (card: CardInfo) => Promise<void>
export type UpdateCard = (card: CardInfo) => Promise<void>
export type DeleteCard = (id: string) => Promise<void>

// * List
export type GetList = (year?: number) => Promise<ListData[]>

// * Invoices
export type GetInvoices = () => Promise<InvoiceInfo[]>
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
