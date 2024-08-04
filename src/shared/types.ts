import { CompanyInfo } from './models'

export interface DropDownOption {
  name: string
  className?: string
  icon?: React.ReactNode
}

export type GetCompanies = () => Promise<CompanyInfo[]>
export type GetCompany = (id: string) => Promise<CompanyInfo>
export type AddCompany = (company: CompanyInfo) => Promise<void>
export type UpdateCompany = (company: CompanyInfo) => Promise<void>
export type DeleteCompany = (id: string) => Promise<void>
