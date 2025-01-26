import { CardDto } from '@shared/dtos/card.dto'

export interface ICardService {
  getCards(): Promise<CardDto[]>
  getCardsByCustomerId(customer_id: string): Promise<CardDto[]>
  getCardsByCompanyId(company_id: string): Promise<CardDto[]>
  getCardById(id: string): Promise<CardDto>
  createCard(card: CardDto): Promise<CardDto>
  updateCard(id: string, card: CardDto): Promise<CardDto>
  deleteCard(id: string): Promise<void>
}
