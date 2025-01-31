import { Card, Company, Prisma } from '@prisma/client'
import { LoggerService as logger } from '@shared/services/logger'
import { DateService } from '../date/date.service'
import { context } from '@shared/database/db-context'

interface InvoiceGenerationResult {
  company_id: string
  success: boolean
  invoices_generated: number
  error?: string
}

export class InvoiceGenerationService {
  async generateInvoices(): Promise<void> {
    try {
      const date = await DateService.getCurrentDate()
      const today = this.normalizeDate(date)

      // Fetch all companies - we'll filter by invoice day in memory
      const companies = await context.company.findMany({
        include: {
          cards: {
            where: {
              customer_id: { not: null },
              start_date: { lte: today }
            },
            include: { customer: true }
          }
        }
      })

      // Filter companies that should be invoiced today
      const eligibleCompanies = companies.filter(
        (company: Company) => company.invoice_date.getDate() === today.getDate()
      )

      const results: InvoiceGenerationResult[] = []

      for (const company of eligibleCompanies) {
        try {
          const result = await this.processCompanyInvoices(company, today)
          results.push(result)
        } catch (error) {
          logger.error(`Failed to process invoices for company ${company.id}`, error)
          results.push({
            company_id: company.id,
            success: false,
            invoices_generated: 0,
            error: error instanceof Error ? error.message : 'Unknown error'
          })
        }
      }

      const summary = {
        totalCompanies: results.length,
        successfulCompanies: results.filter((r) => r.success).length,
        totalInvoices: results.reduce((sum, r) => sum + r.invoices_generated, 0),
        failures: results.filter((r) => !r.success)
      }

      logger.info('Invoice generation completed', JSON.stringify(summary))
    } catch (error) {
      logger.error('Invoice generation failed', error)
      throw new Error('Failed to generate invoices')
    }
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  private async processCompanyInvoices(
    company: Prisma.CompanyGetPayload<{ include: { cards: true } }>,
    today: Date
  ): Promise<InvoiceGenerationResult> {
    if (company.cards.length === 0) {
      return {
        company_id: company.id,
        success: true,
        invoices_generated: 0
      }
    }

    const invoicesToCreate = this.prepareInvoices(company.cards, today)

    try {
      await context.$transaction(async (tx) => {
        if (invoicesToCreate.length > 0) {
          await tx.invoice.createMany({ data: invoicesToCreate })
        }

        await tx.company.update({
          where: { id: company.id },
          data: { last_invoice_date: today }
        })
      })

      return {
        company_id: company.id,
        success: true,
        invoices_generated: invoicesToCreate.length
      }
    } catch (error) {
      throw new Error(`Failed to create invoices for company ${company.id}: ${error}`)
    }
  }

  private prepareInvoices(cards: Card[], today: Date): Prisma.InvoiceCreateManyInput[] {
    return cards.map((card) => ({
      customer_id: card.customer_id,
      card_id: card.id,
      amount: card.price_after_vat,
      status: InvoiceStatus.PENDING,
      invoice_date: today
    }))
  }
}
