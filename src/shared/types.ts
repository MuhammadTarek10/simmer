import { CompanyDto } from './dtos/company.dto'

// NOTE: Company
export type GetCompanies = () => Promise<CompanyDto[]>
export type GetCompanyById = (id: string) => Promise<CompanyDto>
export type CreateCompany = (company: CompanyDto) => Promise<CompanyDto>
export type UpdateCompany = (id: string, company: CompanyDto) => Promise<CompanyDto>
export type DeleteCompany = (id: string) => Promise<void>

// NOTE: Card

// NOTE: Customer

// NOTE: Invoice

// NOTE: File
