import { toCompanyDB, toCompanyInfo } from '@shared/mappers'
import { CompanyInfo } from '@shared/models'
import { db } from './database'

export async function addCompany(company: CompanyInfo): Promise<void> {
  await db.company.create({
    data: toCompanyDB(company)
  })
}

export async function getCompanies(): Promise<CompanyInfo[]> {
  const companies = await db.company.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return companies.map((company) => toCompanyInfo(company))
}
export async function getCompany(id: string): Promise<CompanyInfo> {
  const company = await db.company.findUnique({
    where: { id }
  })
  return toCompanyInfo(company)
}

export async function updateCompany(company: CompanyInfo): Promise<void> {
  await db.company.update({
    where: { id: company.id },
    data: {
      name: company.name,
      invoice_date: company.invoice_date,
      phone: company.phone,
      comment: company.comment
    }
  })
}

export async function deleteCompany(id: string): Promise<void> {
  await db.company.delete({ where: { id } })
}
