import { CardDto } from '@shared/dtos/card.dto'
import { ICardService } from '@shared/interfaces/icard.service'
import { context } from '@shared/database/db-context'
import { CardMapper } from '@/mappers/card.mapper'
import { Prisma } from '@prisma/client'

export class CardService implements ICardService {
  async getCards(): Promise<CardDto[]> {
    const cards = await context.card.findMany({
      include: {
        customer: true
      }
    })

    return CardMapper.toDtos(cards)
  }

  async getCardsByCustomerId(customer_id: string): Promise<CardDto[]> {
    const cards = await context.card.findMany({
      where: {
        customer_id: customer_id
      }
    })

    return CardMapper.toDtos(cards)
  }

  async getCardsByCompanyId(company_id: string): Promise<CardDto[]> {
    const cards = await context.card.findMany({
      where: {
        company_id: company_id
      }
    })

    return CardMapper.toDtos(cards)
  }

  async getCardById(id: string): Promise<CardDto> {
    const card = await context.card.findUnique({
      where: {
        id: id
      }
    })

    if (!card) throw new Error('Card not found')

    return CardMapper.toDto(card)
  }

  async createCard(card: CardDto): Promise<CardDto> {
    const createdCard = await context.card.create({
      data: CardMapper.toModel(card) as Prisma.CardCreateInput
    })

    return CardMapper.toDto(createdCard)
  }

  async updateCard(id: string, card: CardDto): Promise<CardDto> {
    const updatedCard = await context.card.update({
      where: {
        id: id
      },
      data: CardMapper.toModel(card)
    })

    return CardMapper.toDto(updatedCard)
  }

  async deleteCard(id: string): Promise<void> {
    await context.card.delete({
      where: {
        id: id
      }
    })
  }
}
