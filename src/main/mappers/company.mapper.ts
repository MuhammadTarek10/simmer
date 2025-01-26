import { Card, Company } from '@prisma/client'
import { CardMapper } from './card.mapper'
import { CompanyDto } from '@shared/dtos/company.dto'

interface CompanyWithRelations extends Company {
  cards: Card[]
}

export class CompanyMapper {
  public static toDtos(companies: Company[]): CompanyDto[] {
    return companies.map((company: Company) => CompanyMapper.toDto(company))
  }

  public static toDto(company: Company | CompanyWithRelations, includeCards = false): CompanyDto {
    return {
      id: company.id,
      name: company.name,
      invoice_date: company.invoice_date,
      phone: company.phone ?? '',
      comment: company.comment ?? '',
      cards: includeCards && 'cards' in company ? CardMapper.toDtos(company.cards) : []
    }
  }

  public static toModel(company: Partial<CompanyDto>): Partial<Company> {
    return {
      id: company.id,
      name: company.name,
      invoice_date: company.invoice_date,
      phone: company.phone,
      comment: company.comment
    }
  }
}
