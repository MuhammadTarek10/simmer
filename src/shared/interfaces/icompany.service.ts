import { CompanyDto } from '@shared/dtos/company.dto'

export interface ICompanyService {
  getCompanies(): Promise<CompanyDto[]>
  getCompanyById(id: string): Promise<CompanyDto>
  createCompany(company: CompanyDto): Promise<CompanyDto>
  updateCompany(id: string, company: CompanyDto): Promise<CompanyDto>
  deleteCompany(id: string): Promise<void>
}
