import { groupByMonth } from '@shared/mappers'
import { ListData } from '@shared/models'
import { prisma } from './database'

export async function getLists(all: boolean): Promise<ListData[]> {
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

  return groupByMonth(invoices, all)
}
