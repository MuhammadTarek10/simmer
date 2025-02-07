import { CardDto } from '@shared/dtos/card.dto'

export interface CardState {
  cards: { data: CardDto[] | null }
  currentCard: { data: CardDto | null }
}
