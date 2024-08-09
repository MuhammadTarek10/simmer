import { groupByMonth } from '@shared/mappers'
import { ListData } from '@shared/models'
import { prisma } from './database'

export async function getLists(year?: number): Promise<ListData[]> {
  let invoices: any[]

  if (year) {
    invoices = await prisma.invoice.findMany({
      where: {
        invoice_date: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1)
        }
      },
      include: {
        customer: {
          include: {
            cards: true
          }
        }
      }
    })
  } else {
    invoices = await prisma.invoice.findMany({
      include: {
        customer: {
          include: {
            cards: true
          }
        }
      }
    })
  }

  return groupByMonth(invoices)
}
