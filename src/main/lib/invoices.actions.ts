import { toInvoiceMain, toInvoiceRenderer } from '@shared/mappers'
import { InvoiceInfo } from '@shared/models'
import { prisma } from './database'

export async function addInvoice(invoice: InvoiceInfo): Promise<void> {
  await prisma.invoice.create({
    data: toInvoiceMain(invoice)
  })
}

export async function getInvoices(): Promise<InvoiceInfo[]> {
  const invoices = await prisma.invoice.findMany()
  return invoices.map((invoice) => toInvoiceRenderer(invoice))
}

export async function getInvoice(id: string): Promise<InvoiceInfo> {
  const invoice = await prisma.invoice.findUnique({ where: { id } })
  return toInvoiceRenderer(invoice)
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
