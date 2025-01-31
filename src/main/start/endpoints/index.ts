import { ipcMain } from 'electron'
import {
  CreateCard,
  CreateCompany,
  CreateCustomer,
  CreateInvoice,
  DeleteCard,
  DeleteCompany,
  DeleteCustomer,
  DeleteInvoice,
  GenerateInvoices,
  GetCardById,
  GetCards,
  GetCardsByCompanyId,
  GetCardsByCustomerId,
  GetCompanies,
  GetCompanyById,
  GetCustomerById,
  GetCustomers,
  GetInvoiceById,
  GetInvoices,
  GetInvoicesByCardId,
  GetInvoicesByCustomerId,
  PayInvoice,
  PayPartialInvoice,
  TransferCard,
  UpdateCard,
  UpdateCompany,
  UpdateCustomer,
  UpdateInvoice
} from '@shared/constants/types'

import { di } from '@services'

import { Communication } from '@shared/constants/communication'

export const setupEndPoints = () => {
  //  NOTE: Company
  ipcMain.handle(Communication.GET_COMPANIES, async (_, ...args: Parameters<GetCompanies>) =>
    di.companyService.getCompanies(...args)
  )

  ipcMain.handle(Communication.GET_COMPANY_BY_ID, async (_, ...args: Parameters<GetCompanyById>) =>
    di.companyService.getCompanyById(...args)
  )

  ipcMain.handle(Communication.CREATE_COMPANY, async (_, ...args: Parameters<CreateCompany>) =>
    di.companyService.createCompany(...args)
  )

  ipcMain.handle(Communication.UPDATE_COMPANY, async (_, ...args: Parameters<UpdateCompany>) =>
    di.companyService.updateCompany(...args)
  )

  ipcMain.handle(Communication.DELETE_COMPANY, async (_, ...args: Parameters<DeleteCompany>) =>
    di.companyService.deleteCompany(...args)
  )

  // NOTE: Card
  ipcMain.handle(Communication.GET_CARDS, async (_, ...args: Parameters<GetCards>) =>
    di.cardService.getCards(...args)
  )

  ipcMain.handle(Communication.GET_CARD_BY_ID, async (_, ...args: Parameters<GetCardById>) =>
    di.cardService.getCardById(...args)
  )

  ipcMain.handle(Communication.CREATE_CARD, async (_, ...args: Parameters<CreateCard>) =>
    di.cardService.createCard(...args)
  )

  ipcMain.handle(Communication.UPDATE_CARD, async (_, ...args: Parameters<UpdateCard>) =>
    di.cardService.updateCard(...args)
  )

  ipcMain.handle(Communication.DELETE_CARD, async (_, ...args: Parameters<DeleteCard>) =>
    di.cardService.deleteCard(...args)
  )

  ipcMain.handle(
    Communication.GET_CARDS_BY_CUSTOMER_ID,
    async (_, ...args: Parameters<GetCardsByCustomerId>) =>
      di.cardService.getCardsByCustomerId(...args)
  )

  ipcMain.handle(
    Communication.GET_CARDS_BY_COMPANY_ID,
    async (_, ...args: Parameters<GetCardsByCompanyId>) =>
      di.cardService.getCardsByCompanyId(...args)
  )

  // NOTE: Customer
  ipcMain.handle(Communication.GET_CUSTOMERS, async (_, ...args: Parameters<GetCustomers>) =>
    di.customerService.getCustomers(...args)
  )

  ipcMain.handle(
    Communication.GET_CUSTOMER_BY_ID,
    async (_, ...args: Parameters<GetCustomerById>) => di.customerService.getCustomerById(...args)
  )

  ipcMain.handle(Communication.CREATE_CUSTOMER, async (_, ...args: Parameters<CreateCustomer>) =>
    di.customerService.createCustomer(...args)
  )

  ipcMain.handle(Communication.UPDATE_CUSTOMER, async (_, ...args: Parameters<UpdateCustomer>) =>
    di.customerService.updateCustomer(...args)
  )

  ipcMain.handle(Communication.DELETE_CUSTOMER, async (_, ...args: Parameters<DeleteCustomer>) =>
    di.customerService.deleteCustomer(...args)
  )

  ipcMain.handle(Communication.TRANSFER_CARD, async (_, ...args: Parameters<TransferCard>) =>
    di.customerService.transferCard(...args)
  )

  // NOTE: Invoice
  ipcMain.handle(Communication.GET_INVOICES, async (_, ...args: Parameters<GetInvoices>) =>
    di.invoiceService.getInvoices(...args)
  )

  ipcMain.handle(Communication.GET_INVOICE_BY_ID, async (_, ...args: Parameters<GetInvoiceById>) =>
    di.invoiceService.getInvoiceById(...args)
  )

  ipcMain.handle(
    Communication.GET_INVOICES_BY_CARD_ID,
    async (_, ...args: Parameters<GetInvoicesByCardId>) =>
      di.invoiceService.getInvoiceByCardId(...args)
  )

  ipcMain.handle(
    Communication.GET_INVOICES_BY_CUSTOMER_ID,
    async (_, ...args: Parameters<GetInvoicesByCustomerId>) =>
      di.invoiceService.getInvoicesByCustomerId(...args)
  )

  ipcMain.handle(Communication.CREATE_INVOICE, async (_, ...args: Parameters<CreateInvoice>) =>
    di.invoiceService.createInvoice(...args)
  )

  ipcMain.handle(Communication.UPDATE_INVOICE, async (_, ...args: Parameters<UpdateInvoice>) =>
    di.invoiceService.updateInvoice(...args)
  )

  ipcMain.handle(Communication.DELETE_INVOICE, async (_, ...args: Parameters<DeleteInvoice>) =>
    di.invoiceService.deleteInvoice(...args)
  )

  ipcMain.handle(
    Communication.GENERATE_INVOICES,
    async (_, ...args: Parameters<GenerateInvoices>) => di.invoiceService.generateInvoices(...args)
  )

  ipcMain.handle(Communication.PAY_INVOICE, async (_, ...args: Parameters<PayInvoice>) =>
    di.invoiceService.payInvoice(...args)
  )

  ipcMain.handle(
    Communication.PAY_PARTIAL_INVOICE,
    async (_, ...args: Parameters<PayPartialInvoice>) =>
      di.invoiceService.payPartialInvoice(...args)
  )

  // TODO: File

  // TODO: Home
}
