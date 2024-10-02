import { toListInfoInfo } from '@shared/mappers'
import { ListInfo } from '@shared/models'
import { prisma } from './database'

export async function getLists(all: boolean): Promise<ListInfo[]> {
  const invoices = await prisma.invoice.findMany({
    include: {
      customer: {
        include: {
          cards: true
        }
      }
    },
    orderBy: {
      invoice_date: 'asc'
    }
  })

  return toListInfoInfo(invoices, all)
}
