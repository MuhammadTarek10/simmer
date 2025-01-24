import { Company } from '@shared/models/company.model'

// * Company
export type GetCompanies = () => Promise<Company[]>
export type GetCompanyById = (id: string) => Promise<Company>
export type CreateCompany = (company: Company) => Promise<Company>
export type UpdateCompany = (id: string, company: Company) => Promise<Company>
export type DeleteCompany = (id: string) => Promise<Company>
