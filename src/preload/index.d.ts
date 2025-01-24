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
      // * Company
      getCompanies: GetCompanies
      getCompanyById: GetCompanyById
      createCompany: CreateCompany
      updateCompany: UpdateCompany
      deleteCompany: DeleteCompany
    }
  }
}
