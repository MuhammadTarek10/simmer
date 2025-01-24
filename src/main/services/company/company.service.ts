import { ICompanyService } from '@shared/interfaces/icompany.service'
import { context } from '@shared/database/db-context'
import { Company } from '@shared/models/company.model'

export class CompanyService implements ICompanyService {
  async getCompanies(): Promise<Company[]> {
    return await context.company.findMany({
      orderBy: { name: 'asc' }
    })
  }

  async getCompanyById(id: string): Promise<Company> {
    return await context.company.findUnique({
      include: { card: true },
      where: { id: id }
    })
  }

  async createCompany(company: Company): Promise<Company> {
    return await context.company.create({ data: company })
  }

  async updateCompany(id: string, company: Company): Promise<Company> {
    return await context.company.update({
      where: { id: id },
      data: company
    })
  }

  async deleteCompany(id: string): Promise<Company> {
    return await context.company.delete({
      where: { id: id }
    })
  }
}
