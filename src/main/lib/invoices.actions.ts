import { groupInvoicesByName, toInvoiceMain, toInvoiceRenderer } from '@shared/mappers'
import { InvoiceData, InvoiceInfo } from '@shared/models'
import { prisma } from './database'

export async function updatePaymentInvoices() {
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
    }
  }
}

export async function addInvoice(invoice: InvoiceInfo): Promise<void> {
  await prisma.invoice.create({
    data: toInvoiceMain(invoice)
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
      invoice_date: 'desc'
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
  return invoices.map((invoice) => toInvoiceRenderer(invoice))
}

export async function getInvoice(id: string): Promise<InvoiceInfo> {
  const invoice = await prisma.invoice.findUnique({ where: { id } })
  return toInvoiceRenderer(invoice)
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
      invoice_date: 'desc'
    }
  })
  return groupInvoicesByName(invoices)
}

export async function updateInvoice(invoice: InvoiceInfo): Promise<void> {
  await prisma.invoice.update({
    where: { id: invoice.id },
    data: toInvoiceMain(invoice)
  })
}

export async function deleteInvoice(id: string): Promise<void> {
  await prisma.invoice.delete({
    where: { id }
  })
}
