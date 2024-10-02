import { toCardDB, toCardInfo } from '@shared/mappers'
import { CardInfo } from '@shared/models'
import { prisma } from './database'

export async function addCard(card: CardInfo): Promise<void> {
  await prisma.card.create({
    data: toCardDB(card)
  })
}

export async function getCards(): Promise<CardInfo[]> {
  const cards = await prisma.card.findMany({
    include: {
      company: true,
      offer: true,
      customer: true
    }
  })

  return cards.map((card) => toCardInfo(card))
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
  const card = await prisma.card.findUnique({
    where: { id },
    include: {
      company: true,
      offer: true,
      customer: true
    }
  })
  return toCardInfo(card)
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
