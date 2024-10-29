import { groupInvoicesByName, toInvoiceDB, toInvoiceInfo } from '@shared/mappers'
import { InvoiceData, InvoiceInfo } from '@shared/models'
import { prisma } from './database'

export async function updatePaymentInvoices() {
  try {
    const cards = await prisma.card.findMany({
      where: {
        NOT: {
          customer_id: null
        }
      }
    })

    for (const card of cards) {
      const date = new Date(card.start_date)
      const currentDate = new Date()

      while (date <= currentDate) {
        try {
          // Check if invoice already exists
          const invoice = await prisma.invoice.findFirst({
            where: {
              amount: -card.price_after_vat,
              invoice_date: date,
              customer_id: card.customer_id
            }
          })

          if (!invoice) {
            await prisma.invoice.create({
              data: {
                amount: -card.price_after_vat,
                invoice_date: date,
                customer_id: card.customer_id
              }
            })
          }
          date.setMonth(date.getMonth() + 1)
        } catch (invoiceError) {
          console.error(`Failed to process invoice for card ${card.id}:`, invoiceError)
          // Continue with next iteration instead of failing entire process
          continue
        }
      }
    }
  } catch (error) {
    console.error('Failed to update payment invoices:', error)
    throw new Error('Failed to update payment records. Please try again.')
  }
}

export async function addInvoice(invoice: InvoiceInfo): Promise<void> {
  await prisma.invoice.create({
    data: toInvoiceDB(invoice)
  })
}

export async function getInvoicesGrouped(): Promise<InvoiceData[]> {
  const invoices = await prisma.invoice.findMany({
    include: {
      customer: {
        include: {
          cards: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  })
  return groupInvoicesByName(invoices)
}

export async function getInvoices(): Promise<InvoiceInfo[]> {
  const invoices = await prisma.invoice.findMany({
    include: {
      customer: true
    }
  })
  return invoices.map((invoice) => toInvoiceInfo(invoice))
}

export async function getInvoice(id: string): Promise<InvoiceInfo> {
  const invoice = await prisma.invoice.findUnique({ where: { id } })
  return toInvoiceInfo(invoice)
}

export async function getInvoicesByCustomerId(id: string) {
  const invoices = await prisma.invoice.findMany({
    where: {
      customer_id: id
    },
    include: {
      customer: {
        include: {
          cards: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  })
  return groupInvoicesByName(invoices)
}

export async function updateInvoice(invoice: InvoiceInfo): Promise<void> {
  await prisma.invoice.update({
    where: { id: invoice.id },
    data: toInvoiceDB(invoice)
  })
}

export async function deleteInvoice(id: string): Promise<void> {
  await prisma.invoice.delete({
    where: { id }
  })
}
