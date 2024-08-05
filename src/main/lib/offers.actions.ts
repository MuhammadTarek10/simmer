import { toInvoiceMain, toOfferRenderer } from '@shared/mappers'
import { InvoiceInfo, OfferInfo } from '@shared/models'
import { prisma } from './database'

export async function addInvoice(invoice: InvoiceInfo): Promise<void> {
  await prisma.invoice.create({
    data: toInvoiceMain(invoice)
  })
}

export async function getOffers(): Promise<OfferInfo[]> {
  const offers = await prisma.offer.findMany()
  return offers.map((offer) => toOfferRenderer(offer))
}
