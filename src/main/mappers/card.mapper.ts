import { Card, Company, Customer } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { CardDto } from '@shared/dtos/card.dto'
import { CustomerMapper } from './customer.mapper'
import { CompanyMapper } from './company.mapper'

interface CardWithRelations extends Card {
  company: Company
  customer: Customer
}

export class CardMapper {
  public static toDtos(cards: Card[]): CardDto[] {
    return cards.map((card: Card) => CardMapper.toDto(card))
  }

  public static toDto(card: CardWithRelations | Card): CardDto {
    return {
      id: card.id,
      number: card.number,
      price_before_vat: Number(card.price_before_vat),
      price_after_vat: Number(card.price_after_vat),
      start_date: card.start_date,
      comment: card.comment,
      company: 'company' in card ? CompanyMapper.toDto(card.company) : null,
      customer: 'customer' in card ? CustomerMapper.toDto(card.customer) : null
    }
  }

  public static toModel(card: Partial<CardDto>): Partial<Card> {
    return {
      id: card.id,
      number: card.number,
      start_date: card.start_date,
      price_before_vat: new Decimal(card.price_before_vat ?? 0),
      price_after_vat: new Decimal(card.price_after_vat ?? 0),
      comment: card.comment,
      company_id: card.company?.id,
      customer_id: card.customer?.id
    }
  }
}
