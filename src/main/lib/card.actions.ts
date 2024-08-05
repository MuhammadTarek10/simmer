import { toCardMain, toCardRenderer } from '@shared/mappers'
import { CardInfo } from '@shared/models'
import { prisma } from './database'

export async function addCard(card: CardInfo): Promise<void> {
  await prisma.card.create({
    data: toCardMain(card)
  })
}

export async function getCards(): Promise<CardInfo[]> {
  const cards = await prisma.card.findMany({
    include: {
      company: true,
      offer: true,
      customers: true
    }
  })

  return cards.map((card) => toCardRenderer(card))
}

export async function getUnOccupiedCards(): Promise<CardInfo[]> {
  const cards = await prisma.card.findMany({
    where: {
      customers: {
        none: {}
      }
    }
  })

  return cards.map((card) => toCardRenderer(card))
}

export async function getCard(id: string): Promise<CardInfo> {
  const card = await prisma.card.findUnique({ where: { id } })
  return toCardRenderer(card)
}

export async function getCardsFromCompanyId(id: string): Promise<CardInfo[]> {
  const cards = await prisma.card.findMany({
    where: {
      company_id: id
    },
    include: {
      company: true
    }
  })

  return cards.map((card) => toCardRenderer(card))
}

export async function updateCard(card: CardInfo): Promise<void> {
  await prisma.card.update({
    where: { id: card.id },
    data: toCardMain(card)
  })
}

export async function deleteCard(id: string): Promise<void> {
  await prisma.card.delete({
    where: { id }
  })
}
