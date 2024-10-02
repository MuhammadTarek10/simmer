import { toCompanyDB, toCompanyInfo } from '@shared/mappers'
import { CompanyInfo } from '@shared/models'
import { prisma } from './database'

export async function addCompany(company: CompanyInfo): Promise<void> {
  await prisma.company.create({
    data: toCompanyDB(company)
  })
}

export async function getCompanies(): Promise<CompanyInfo[]> {
  const companies = await prisma.company.findMany()

  return companies.map((company) => toCompanyInfo(company))
}
export async function getCompany(id: string): Promise<CompanyInfo> {
  const company = await prisma.company.findUnique({
    where: { id }
  })
  return toCompanyInfo(company)
}

export async function updateCompany(company: CompanyInfo): Promise<void> {
  await prisma.company.update({
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
  await prisma.company.delete({ where: { id } })
}
