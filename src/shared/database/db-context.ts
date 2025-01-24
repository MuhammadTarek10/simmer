import { PrismaClient } from '@prisma/client'

export const context = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})
