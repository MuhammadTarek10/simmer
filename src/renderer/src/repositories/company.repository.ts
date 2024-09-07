import { CompanyInfo } from '@shared/models'

export async function addCompany(company: CompanyInfo): Promise<void> {
  await window.context.addCompany(company)
}

export async function getCompanies(): Promise<CompanyInfo[]> {
  return await window.context.getCompanies()
}

export async function getCompany(id: string): Promise<CompanyInfo> {
  return await window.context.getCompany(id)
}

export async function updateCompany(company: CompanyInfo): Promise<void> {
  await window.context.updateCompany(company)
}

export async function deleteCompany(id: string): Promise<void> {
  await window.context.deleteCompany(id)
}
