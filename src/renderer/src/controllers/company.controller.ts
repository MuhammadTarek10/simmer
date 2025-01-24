export class CompanyController {
  public static async getCompanies(): Promise<CompanyDto[]> {
    return await window.context.getCompanies()
  }

  public static async getCompany(id: string): Promise<CompanyDto> {
    return await window.context.getCompanyById(id)
  }

  public static async createCompany(company: CompanyDto): Promise<CompanyDto> {
    return await window.context.createCompany(company)
  }

  public static async updateCompany(id: string, company: CompanyDto): Promise<CompanyDto> {
    return await window.context.updateCompany(id, company)
  }

  public static async deleteCompany(id: string): Promise<void> {
    await window.context.deleteCompany(id)
  }
}
