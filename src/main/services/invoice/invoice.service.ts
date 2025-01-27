import { InvoiceDto } from '@shared/dtos/invoice.dto'
import { IInvoiceService } from '@shared/interfaces/iincoive.service'

import { context } from '@shared/database/db-context'
import { InvoiceMapper } from '@/mappers/invoice.mapper'
import { InvoiceStatus, Prisma } from '@prisma/client'
import { DateService } from '../date/date.service'

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
    const date = await DateService.getCurrentDate()
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    const companies = await context.company.findMany({
      include: {
        cards: {
          where: { customer_id: { not: null } },
          include: { customer: true }
        }
      }
    })

    for (const company of companies) {
      if (company.invoice_date.getDate() !== today.getDate()) continue

      const invoicesToCreate = company.cards.map((card) => ({
        customer_id: card.customer_id,
        card_id: card.id,
        amount: card.price_after_vat,
        invoice_date: today,
        status: InvoiceStatus.PENDING
      }))

      if (invoicesToCreate.length > 0) {
        await context.invoice.createMany({
          data: invoicesToCreate
        })
      }

      await context.company.update({
        where: { id: company.id },
        data: { last_invoice_date: today }
      })
    }
  }

  async payInvoice(id: string): Promise<InvoiceDto> {
    const invoice = await this.getInvoiceById(id)

    if (invoice.status !== InvoiceStatus.PENDING)
      throw new Error(`Invoice with ID ${id} is not pending`)

    return await this.updateInvoice(id, {
      ...invoice,
      status: InvoiceStatus.PAID
    })
  }

  async payPartialInvoice(
    customer_id: string,
    card_id: string,
    amount: number
  ): Promise<InvoiceDto> {
    const invoice = await context.invoice.create({
      data: {
        customer_id: customer_id,
        card_id: card_id,
        amount: amount,
        status: InvoiceStatus.PAID
      }
    })

    return InvoiceMapper.toDto(invoice)
  }
}
