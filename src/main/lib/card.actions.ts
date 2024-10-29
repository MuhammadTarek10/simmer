import { toCardDB, toCardInfo } from '@shared/mappers'
import { CardInfo } from '@shared/models'
import { prisma } from './database'

export async function addCard(card: CardInfo): Promise<void> {
  try {
    await prisma.card.create({
      data: toCardDB(card)
    })
  } catch (error) {
    console.error('Failed to add card:', error)
    throw new Error('Failed to add card. Card number may already exist.')
  }
}

export async function getCards(): Promise<CardInfo[]> {
  try {
    const cards = await prisma.card.findMany({
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
  const cards = await prisma.card.findMany({
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
    const card = await prisma.card.findUnique({
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
  const cards = await prisma.card.findMany({
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
  const cards = await prisma.card.findMany({
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
  await prisma.card.update({
    where: { id: card.id },
    data: toCardDB(card)
  })
}

export async function deleteCard(id: string): Promise<void> {
  await prisma.card.delete({
    where: { id }
  })
}
