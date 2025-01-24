import {
  GetCompanies,
  GetCompanyById,
  CreateCompany,
  UpdateCompany,
  DeleteCompany
} from '@shared/types'

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

      // NOTE: File
    }
  }
}
