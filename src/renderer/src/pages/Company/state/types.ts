import { CompanyDto } from '@shared/dtos/company.dto'

export interface CompanyState {
  companies: {
    data: CompanyDto[]
    isLoading: boolean
    error: string | null
  }
  currentCompany: {
    data: CompanyDto | null
    isLoading: boolean
    error: string | null
  }
}
