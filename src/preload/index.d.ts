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
  DeleteInvoice
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

      // NOTE: Customer

      // NOTE: Invoice
      getInvoices: GetInvoices
      getInvoicesByCardId: GetInvoicesByCardId
      getInvoicesByCustomerId: GetInvoicesByCustomerId
      getInvoiceById: GetInvoiceById
      createInvoice: CreateInvoice
      updateInvoice: UpdateInvoice
      deleteInvoice: DeleteInvoice

      // NOTE: File
    }
  }
}
