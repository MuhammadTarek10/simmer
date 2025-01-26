import { InvoiceDto } from '@shared/dtos/invoice.dto'

export interface IInvoiceService {
  getInvoices(): Promise<InvoiceDto[]>
  getInvoiceById(id: string): Promise<InvoiceDto>
  getInvoiceByCardId(id: string): Promise<InvoiceDto[]>
  getInvoicesByCustomerId(id: string): Promise<InvoiceDto[]>
  createInvoice(dto: InvoiceDto): Promise<InvoiceDto>
  payInvoice(id: string): Promise<InvoiceDto>
  payPartialInvoice(customer_id: string, card_id: string, amount: number): Promise<InvoiceDto>
  updateInvoice(id: string, dto: InvoiceDto): Promise<InvoiceDto>
  deleteInvoice(id: string): Promise<void>
  generateInvoices(): Promise<void>
}
