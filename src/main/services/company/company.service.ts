import { ICompanyService } from '@shared/interfaces/icompany.service'
import { context } from '@shared/database/db-context'
import { CompanyDto } from '@shared/dtos/company.dto'
import { Prisma } from '@prisma/client'
import { CompanyMapper } from '@/mappers/company.mapper'

export class CompanyService implements ICompanyService {
  async getCompanies(): Promise<CompanyDto[]> {
    const companies = await context.company.findMany({
      orderBy: { name: 'asc' },
      include: { cards: true }
    })

    return CompanyMapper.toDtos(companies)
  }

  async getCompanyById(id: string): Promise<CompanyDto> {
    const company = await context.company.findUnique({
      where: { id: id },
      include: { cards: true }
    })

    if (company === null) throw new Error(`Company with id ${id} not found`)

    return CompanyMapper.toDto(company)
  }

  async createCompany(dto: CompanyDto): Promise<CompanyDto> {
    const company = await context.company.create({
      data: CompanyMapper.toModel(dto) as Prisma.CompanyCreateInput
    })
    return CompanyMapper.toDto(company)
  }

  async updateCompany(id: string, dto: CompanyDto): Promise<CompanyDto> {
    const company = await context.company.update({
      where: { id: id },
      data: CompanyMapper.toModel(dto)
    })

    return CompanyMapper.toDto(company)
  }

  async deleteCompany(id: string): Promise<void> {
    const company = await context.company.findUnique({ where: { id: id } })

    if (!company) throw new Error(`Company with ID ${id} not found`)

    await context.company.delete({
      where: { id: id }
    })
  }
}
