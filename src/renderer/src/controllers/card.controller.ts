import { CardDto } from '@shared/dtos/card.dto'

export class CardController {
  public static async getCardsByCustomerId(customerId: string): Promise<CardDto[]> {
    return await window.context.getCardsByCustomerId(customerId)
  }

  public static async getCardsByCompanyId(companyId: string): Promise<CardDto[]> {
    return await window.context.getCardsByCompanyId(companyId)
  }

  public static async getCards(): Promise<CardDto[]> {
    return await window.context.getCards()
  }

  public static async getCardById(id: string): Promise<CardDto> {
    return await window.context.getCardById(id)
  }

  public static async createCard(card: CardDto): Promise<CardDto> {
    return await window.context.createCard(card)
  }

  public static async updateCard(id: string, card: CardDto): Promise<CardDto> {
    return await window.context.updateCard(id, card)
  }

  public static async deleteCard(id: string): Promise<void> {
    await window.context.deleteCard(id)
  }
}
