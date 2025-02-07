import { CompanyDto } from '@shared/dtos/company.dto'

export interface CompanyState {
  companies: {
    data: CompanyDto[] | null
  }
  currentCompany: {
    data: CompanyDto | null
  }
}
