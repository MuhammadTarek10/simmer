import { Company } from '@shared/models/company.model'

export interface ICompanyService {
  getCompanies(): Promise<Company[]>
  getCompanyById(id: string): Promise<Company>
  createCompany(company: Company): Promise<Company>
  updateCompany(id: string, company: Company): Promise<Company>
  deleteCompany(id: string): Promise<Company>
}
