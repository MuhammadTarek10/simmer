import { Company } from '@shared/models/company.model'

export class CompanyApis {
  static async getCompanies(): Promise<Company[]> {
    return await window.context.getCompanies()
  }
}
