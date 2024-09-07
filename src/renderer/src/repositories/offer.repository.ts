import { OfferInfo } from '@shared/models'

export async function addOffer(offer: OfferInfo): Promise<void> {
  return await window.context.addOffer(offer)
}

export async function getOffers(): Promise<OfferInfo[]> {
  return await window.context.getOffers()
}
