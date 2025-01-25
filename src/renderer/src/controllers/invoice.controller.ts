import { InvoiceDto } from '@shared/dtos/invoice.dto'

export class InvoiceController {
  public static async getInvoices(): Promise<InvoiceDto[]> {
    return await window.context.getInvoices()
  }

  public static async getInvoicesByCardId(cardId: string): Promise<InvoiceDto[]> {
    return await window.context.getInvoicesByCardId(cardId)
  }

  public static async getInvoicesByCustomerId(customerId: string): Promise<InvoiceDto[]> {
    return await window.context.getInvoicesByCustomerId(customerId)
  }

  public static async getInvoiceById(id: string): Promise<InvoiceDto> {
    return await window.context.getInvoiceById(id)
  }

  public static async createInvoice(invoice: InvoiceDto): Promise<InvoiceDto> {
    return await window.context.createInvoice(invoice)
  }

  public static async updateInvoice(id: string, invoice: InvoiceDto): Promise<InvoiceDto> {
    return await window.context.updateInvoice(id, invoice)
  }

  public static async deleteInvoice(id: string): Promise<void> {
    await window.context.deleteInvoice(id)
  }
}
