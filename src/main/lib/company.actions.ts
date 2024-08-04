import { mockCompanies } from '@shared/mocks/dummy'
import { CompanyInfo } from '@shared/models'

export async function addCompany(company: CompanyInfo): Promise<void> {}

export async function getCompanies(): Promise<CompanyInfo[]> {
  return mockCompanies
}
export async function getCompany(id: string): Promise<CompanyInfo> {}

export async function updateCompany(company: CompanyInfo): Promise<void> {}

export async function deleteCompany(id: string): Promise<void> {}
