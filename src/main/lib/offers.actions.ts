import { toOfferDB, toOfferInfo } from '@shared/mappers'
import { OfferInfo } from '@shared/models'
import { db } from './database'

export async function addOffer(offer: OfferInfo): Promise<void> {
  await db.offer.create({
    data: toOfferDB(offer)
  })
}

export async function getOffers(): Promise<OfferInfo[]> {
  const offers = await db.offer.findMany()

  return offers.map((offer) => toOfferInfo(offer))
}
