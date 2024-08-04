import { AddCompany, DeleteCompany, GetCompanies, GetCompany, UpdateCompany } from '@shared/types'
declare global {
  interface Window {
    context: {
      getCompanies: GetCompanies
      getCompany: GetCompany
      addCompany: AddCompany
      updateCompany: UpdateCompany
      deleteCompany: DeleteCompany
    }
  }
}
