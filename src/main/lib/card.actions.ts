import { toCardDB, toCardInfo } from '@shared/mappers'
import { CardInfo } from '@shared/models'
import { db } from './database'

export async function addCard(card: CardInfo): Promise<void> {
  try {
    await db.card.create({
      data: toCardDB(card)
    })
  } catch (error) {
    console.error('Failed to add card:', error)
    throw new Error('Failed to add card. Card number may already exist.')
  }
}

export async function getCards(): Promise<CardInfo[]> {
  try {
    const cards = await db.card.findMany({
      include: {
        company: true,
        offer: true,
        customer: true
      }
    })
    return cards.map((card) => toCardInfo(card))
  } catch (error) {
    console.error('Failed to fetch cards:', error)
    throw new Error('Failed to retrieve cards. Please try again.')
  }
}

export async function getUnOccupiedCards(): Promise<CardInfo[]> {
  const cards = await db.card.findMany({
    where: {
      customer_id: null
    },
    include: {
      company: true,
      offer: true,
      customer: true
    }
  })

  return cards.map((card) => toCardInfo(card))
}

export async function getCard(id: string): Promise<CardInfo> {
  try {
    const card = await db.card.findUnique({
      where: { id },
      include: {
        company: true,
        offer: true,
        customer: true
      }
    })
    if (!card) {
      throw new Error(`Card with ID ${id} not found`)
    }
    return toCardInfo(card)
  } catch (error) {
    console.error('Failed to fetch card:', error)
    throw new Error('Failed to retrieve card details. Please try again.')
  }
}

export async function getCardsFromCompanyId(id: string): Promise<CardInfo[]> {
  const cards = await db.card.findMany({
    where: {
      company_id: id
    },
    include: {
      company: true,
      offer: true,
      customer: true
    }
  })

  return cards.map((card) => toCardInfo(card))
}

export async function getCardsFromCustomerId(id: string): Promise<CardInfo[]> {
  const cards = await db.card.findMany({
    where: {
      customer_id: id
    },
    include: {
      company: true,
      offer: true,
      customer: true
    }
  })

  return cards.map((card) => toCardInfo(card))
}

export async function updateCard(card: CardInfo): Promise<void> {
  await db.card.update({
    where: { id: card.id },
    data: toCardDB(card)
  })
}

export async function deleteCard(id: string): Promise<void> {
  await db.card.delete({
    where: { id }
  })
}
