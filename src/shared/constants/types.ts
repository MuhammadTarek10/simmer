import { CardDto } from '@shared/dtos/card.dto'
import { CompanyDto } from '@shared/dtos/company.dto'
import { CustomerDto } from '@shared/dtos/customer.dto'
import { InvoiceDto } from '@shared/dtos/invoice.dto'

// NOTE: Company
export type GetCompanies = () => Promise<CompanyDto[]>
export type GetCompanyById = (id: string) => Promise<CompanyDto>
export type CreateCompany = (company: CompanyDto) => Promise<CompanyDto>
export type UpdateCompany = (id: string, company: CompanyDto) => Promise<CompanyDto>
export type DeleteCompany = (id: string) => Promise<void>

// NOTE: Card
export type GetCards = () => Promise<CardDto[]>
export type GetCardById = (id: string) => Promise<CardDto>
export type CreateCard = (card: CardDto) => Promise<CardDto>
export type UpdateCard = (id: string, card: CardDto) => Promise<CardDto>
export type DeleteCard = (id: string) => Promise<void>
export type GetCardsByCustomerId = (id: string) => Promise<CardDto[]>
export type GetCardsByCompanyId = (id: string) => Promise<CardDto[]>

// NOTE: Customer
export type GetCustomers = () => Promise<CustomerDto[]>
export type GetCustomerById = (id: string) => Promise<CustomerDto>
export type CreateCustomer = (customer: CustomerDto) => Promise<CustomerDto>
export type UpdateCustomer = (id: string, customer: CustomerDto) => Promise<CustomerDto>
export type DeleteCustomer = (id: string) => Promise<void>

// NOTE: Invoice
export type GenerateInvoices = () => Promise<void>
export type GetInvoices = () => Promise<InvoiceDto[]>
export type GetInvoiceById = (id: string) => Promise<InvoiceDto>
export type CreateInvoice = (invoice: InvoiceDto) => Promise<InvoiceDto>
export type UpdateInvoice = (id: string, invoice: InvoiceDto) => Promise<InvoiceDto>
export type DeleteInvoice = (id: string) => Promise<void>
export type GetInvoicesByCustomerId = (id: string) => Promise<InvoiceDto[]>
export type GetInvoicesByCardId = (id: string) => Promise<InvoiceDto[]>
export type PayInvoice = (id: string) => Promise<InvoiceDto>
export type PayPartialInvoice = (
  customer_id: string,
  card_id: string,
  amount: number
) => Promise<InvoiceDto>

// NOTE: File
