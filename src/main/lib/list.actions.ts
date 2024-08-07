import { mockListData } from '@shared/mocks/dummy'
import { ListData } from '@shared/models'
import { prisma } from './database'

export async function getLists(year?: number): Promise<ListData[]> {
  const list = await prisma.card.findMany({
    include: {
      company: true
    }
  })

  return mockListData
}
