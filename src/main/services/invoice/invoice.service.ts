import { InvoiceDto } from '@shared/dtos/invoice.dto'
import { IInvoiceService } from '@shared/interfaces/iincoive.service'

import { context } from '@shared/database/db-context'
import { InvoiceMapper } from '../mappers/invoice.mapper'
import { Prisma } from '@prisma/client'

export class InvoiceService implements IInvoiceService {
  async getInvoices(): Promise<InvoiceDto[]> {
    const invoices = await context.invoice.findMany({
      include: {
        card: true,
        customer: true
      }
    })

    return InvoiceMapper.toDtos(invoices)
  }

  async getInvoiceById(id: string): Promise<InvoiceDto> {
    const invoice = await context.invoice.findUnique({
      where: {
        id
      },
      include: {
        card: true,
        customer: true
      }
    })

    if (!invoice) throw new Error(`Invoice with ID ${id} not found`)

    return InvoiceMapper.toDto(invoice)
  }

  async getInvoiceByCardId(id: string): Promise<InvoiceDto[]> {
    const invoices = await context.invoice.findMany({
      where: {
        card_id: id
      },
      include: {
        card: true,
        customer: true
      }
    })

    if (!invoices) throw new Error(`Invoice with Customer ID ${id} not found`)

    return InvoiceMapper.toDtos(invoices)
  }

  async getInvoicesByCustomerId(id: string): Promise<InvoiceDto[]> {
    const invoices = await context.invoice.findMany({
      where: {
        card_id: id
      },
      include: {
        card: true,
        customer: true
      }
    })

    if (!invoices) throw new Error(`Invoice with Card ID ${id} not found`)

    return InvoiceMapper.toDtos(invoices)
  }

  async createInvoice(dto: InvoiceDto): Promise<InvoiceDto> {
    const invoice = await context.invoice.create({
      data: InvoiceMapper.toModel(dto) as Prisma.InvoiceCreateInput,
      include: {
        card: true,
        customer: true
      }
    })

    return InvoiceMapper.toDto(invoice)
  }

  async updateInvoice(id: string, dto: InvoiceDto): Promise<InvoiceDto> {
    const invoice = await context.invoice.update({
      where: { id: id },
      data: InvoiceMapper.toModel(dto),
      include: {
        card: true,
        customer: true
      }
    })

    return InvoiceMapper.toDto(invoice)
  }

  async deleteInvoice(id: string): Promise<void> {
    const invoice = await context.invoice.findUnique({ where: { id: id } })

    if (!invoice) throw new Error(`Invoice with ID ${id} not found`)

    await context.invoice.delete({
      where: { id: id }
    })
  }

  async generateInvoices(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
