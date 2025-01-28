import { di } from '@/services'
import cron from 'node-cron'

export const startInvoiceCronJob = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      await di.invoiceService.generateInvoices()
      console.log('Invoices generated successfully.')
    } catch (error) {
      console.error('Error generating invoices:', error)
    }
  })
  console.log('Invoice generation cron job scheduled.')
}
