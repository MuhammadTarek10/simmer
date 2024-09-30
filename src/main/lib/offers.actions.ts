import { toOfferMain, toOfferRenderer } from '@shared/mappers'
import { OfferInfo } from '@shared/models'
import { prisma } from './database'

export async function addOffer(offer: OfferInfo): Promise<void> {
  await prisma.offer.create({
    data: toOfferMain(offer)
  })
}

export async function getOffers(): Promise<OfferInfo[]> {
  const offers = await prisma.offer.findMany()

  return offers.map((offer) => toOfferRenderer(offer))
}
