import { CardInfo } from '@shared/models'

export async function addCard(card: CardInfo): Promise<void> {
  await window.context.addCard(card)
}

export async function getCards(): Promise<CardInfo[]> {
  return await window.context.getCards()
}

export async function getUnOccupiedCards(): Promise<CardInfo[]> {
  return await window.context.getUnOccupiedCards()
}

export async function getCard(id: string): Promise<CardInfo> {
  return await window.context.getCard(id)
}

export async function getCardsFromCompanyId(id: string): Promise<CardInfo[]> {
  return await window.context.getCardsFromCompanyId(id)
}

export async function getCardsFromCustomerId(id: string): Promise<CardInfo[]> {
  return await window.context.getCardsFromCustomerId(id)
}

export async function updateCard(card: CardInfo): Promise<void> {
  await window.context.updateCard(card)
}

export async function deleteCard(id: string): Promise<void> {
  await window.context.deleteCard(id)
}
