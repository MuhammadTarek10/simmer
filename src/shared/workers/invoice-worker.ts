import { di } from '@/services'
import cron from 'node-cron'
import { LoggerService as logger } from '@shared/services/logger'

export const startInvoiceCronJob = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      await di.invoiceService.generateInvoices()
      logger.info('Invoices generated successfully.')
    } catch (error) {
      logger.error(`Error generating invoices: ${error}`)
    }
  })
  logger.info('Invoice generation cron job scheduled.')
}
