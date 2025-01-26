import { Card } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { CardDto } from '@shared/dtos/card.dto'

export class CardMapper {
  public static toDtos(cards: Card[]): CardDto[] {
    return cards.map((card: Card) => CardMapper.toDto(card))
  }

  public static toDto(card: Card): CardDto {
    return {
      id: card.id,
      number: card.number,
      price_before_vat: Number(card.price_before_vat),
      price_after_vat: Number(card.price_after_vat),
      comment: card.comment,
      company_id: card.company_id,
      customer_id: card.customer_id
    }
  }

  public static toModel(card: Partial<CardDto>): Partial<Card> {
    return {
      id: card.id,
      number: card.number,
      price_before_vat: new Decimal(card.price_before_vat ?? 0),
      price_after_vat: new Decimal(card.price_after_vat ?? 0),
      comment: card.comment,
      company_id: card.company_id,
      customer_id: card.customer_id
    }
  }
}
