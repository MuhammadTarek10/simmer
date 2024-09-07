import { InvoiceInfo } from '@shared/models'

export async function updatePaymentInvoices() {
  await window.context.updatePaymentInvoices()
}

export async function addInvoice(invoice: InvoiceInfo): Promise<void> {
  await window.context.addInvoice(invoice)
}

export async function getInvoicesGrouped() {
  return await window.context.getInvoicesGrouped()
}

export async function getInvoices() {
  return await window.context.getInvoices()
}

export async function getInvoice(id: string) {
  return await window.context.getInvoice(id)
}

export async function getInvoicesByCustomerId(id: string) {
  return await window.context.getInvoicesByCustomerId(id)
}

export async function updateInvoice(invoice: InvoiceInfo) {
  await window.context.updateInvoice(invoice)
}

export async function deleteInvoice(id: string) {
  await window.context.deleteInvoice(id)
}
