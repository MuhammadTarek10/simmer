import { di } from '@/services'
import cron from 'node-cron'
import { LoggerService as logger } from '@shared/services/logger'

export const startInvoiceCronJob = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      await di.invoiceService.generateInvoices()
      logger.info('Invoices generated successfully.', {
        module: 'Invoice Cron Job',
        function: 'generateInvoices'
      })
    } catch (error) {
      logger.error(`Error generating invoices: ${error}`, {
        module: 'Invoice Cron Job',
        function: 'generateInvoices',
        error: error
      })
    }
  })

  logger.info('Invoice generation cron job scheduled.', {
    module: 'Invoice Cron Job',
    function: 'startInvoiceCronJob'
  })
}
