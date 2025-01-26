import {
  GetCompanies,
  GetCompanyById,
  CreateCompany,
  UpdateCompany,
  DeleteCompany,
  GetInvoices,
  GetInvoicesByCardId,
  GetInvoicesByCustomerId,
  GetInvoiceById,
  CreateInvoice,
  UpdateInvoice,
  DeleteInvoice,
  GenerateInvoices,
  PayInvoice,
  PayPartialInvoice,
  GetCards,
  GetCardById,
  CreateCard,
  UpdateCard,
  DeleteCard,
  GetCardsByCustomerId,
  GetCardsByCompanyId,
  GetCustomers,
  GetCustomerById,
  CreateCustomer,
  UpdateCustomer,
  DeleteCustomer
} from '@shared/constants/types'

declare global {
  interface Window {
    context: {
      // NOTE: Company
      getCompanies: GetCompanies
      getCompanyById: GetCompanyById
      createCompany: CreateCompany
      updateCompany: UpdateCompany
      deleteCompany: DeleteCompany

      // NOTE: Card
      getCards: GetCards
      getCardById: GetCardById
      createCard: CreateCard
      updateCard: UpdateCard
      deleteCard: DeleteCard
      getCardsByCustomerId: GetCardsByCustomerId
      getCardsByCompanyId: GetCardsByCompanyId

      // NOTE: Customer
      getCustomers: GetCustomers
      getCustomerById: GetCustomerById
      createCustomer: CreateCustomer
      updateCustomer: UpdateCustomer
      deleteCustomer: DeleteCustomer

      // NOTE: Invoice
      getInvoices: GetInvoices
      getInvoicesByCardId: GetInvoicesByCardId
      getInvoicesByCustomerId: GetInvoicesByCustomerId
      getInvoiceById: GetInvoiceById
      createInvoice: CreateInvoice
      updateInvoice: UpdateInvoice
      deleteInvoice: DeleteInvoice
      generateInvoices: GenerateInvoices
      payInvoice: PayInvoice
      payPartialInvoice: PayPartialInvoice

      // TODO: File

      // TODO: Home
    }
  }
}
