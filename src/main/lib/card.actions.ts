import { toCardMain, toCardRenderer } from '@shared/mappers'
import { CardInfo } from '@shared/models'
import { prisma } from './database'

export async function addCard(card: CardInfo): Promise<void> {
  const data = {
    ...card,
    start_date: new Date(),
    offer_id: card.offer?.id,
    company_id: card.company.id
  }

  await prisma.card.create({
    data: toCardMain(data)
  })
}

export async function getCards(): Promise<CardInfo[]> {
  const cards = await prisma.card.findMany()
  return cards.map((card) => toCardRenderer(card))
}

export async function getCard(id: string): Promise<CardInfo> {
  const card = await prisma.card.findUnique({ where: { id } })
  return toCardRenderer(card)
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
