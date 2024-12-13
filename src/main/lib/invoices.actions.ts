import { groupInvoicesByName, toInvoiceDB, toInvoiceInfo } from '@shared/mappers'
import { InvoiceData, InvoiceInfo } from '@shared/models'
import { prisma } from './database'

export async function updatePaymentInvoices() {
  try {
    // Fetch all cards with customers
    const cards = await prisma.card.findMany({
      where: {
        NOT: {
          customer_id: null
        }
      }
    })

    const currentDate = new Date()

    for (const card of cards) {
      const startDate = new Date(card.start_date)
      startDate.setUTCHours(0, 0, 0, 0) // Ensure the date has no time component

      // Fetch existing invoices for this specific card
      const existingInvoices = await prisma.invoice.findMany({
        where: {
          customer_id: card.customer_id,
          amount: -card.price_after_vat,
          card_number: card.card_number, // Distinguish by card
          invoice_date: {
            gte: startDate,
            lte: currentDate
          }
        },
        select: { invoice_date: true }
      })

      const existingDates = new Set(
        existingInvoices.map((invoice) => invoice.invoice_date.toISOString().split('T')[0])
      )

      const invoicesToCreate = []
      const dateIterator = new Date(startDate)

      while (dateIterator <= currentDate) {
        const dateString = dateIterator.toISOString().split('T')[0]
        if (!existingDates.has(dateString)) {
          invoicesToCreate.push({
            amount: -card.price_after_vat,
            invoice_date: new Date(dateIterator), // Clone the date
            customer_id: card.customer_id,
            card_number: card.card_number // Include card information in the invoice
          })
        }
        dateIterator.setMonth(dateIterator.getMonth() + 1)
      }

      if (invoicesToCreate.length > 0) {
        await prisma.invoice.createMany({ data: invoicesToCreate })
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
