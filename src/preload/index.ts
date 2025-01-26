import { contextBridge, ipcRenderer } from 'electron'
import {
  CreateCard,
  CreateCompany,
  CreateCustomer,
  CreateInvoice,
  DeleteCard,
  DeleteCompany,
  DeleteCustomer,
  DeleteInvoice,
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
  UpdateCard,
  UpdateCompany,
  UpdateCustomer,
  UpdateInvoice
} from '@shared/constants/types'
import { Communication } from '@shared/constants/communication'

if (!process.contextIsolated) {
  throw new Error('The preload script should be context isolated')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // NOTE: Company
    getCompanies: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.GET_COMPANIES, ...args),
    getCompanyById: (...args: Parameters<GetCompanyById>) =>
      ipcRenderer.invoke(Communication.GET_COMPANY_BY_ID, ...args),
    createCompany: (...args: Parameters<CreateCompany>) =>
      ipcRenderer.invoke(Communication.CREATE_COMPANY, ...args),
    updateCompany: (...args: Parameters<UpdateCompany>) =>
      ipcRenderer.invoke(Communication.UPDATE_COMPANY, ...args),
    deleteCompany: (...args: Parameters<DeleteCompany>) =>
      ipcRenderer.invoke(Communication.DELETE_COMPANY, ...args),

    // NOTE: Card
    getCards: (...args: Parameters<GetCards>) =>
      ipcRenderer.invoke(Communication.GET_CARDS, ...args),
    getCardById: (...args: Parameters<GetCardById>) =>
      ipcRenderer.invoke(Communication.GET_CARD_BY_ID, ...args),
    createCard: (...args: Parameters<CreateCard>) =>
      ipcRenderer.invoke(Communication.CREATE_CARD, ...args),
    updateCard: (...args: Parameters<UpdateCard>) =>
      ipcRenderer.invoke(Communication.UPDATE_CARD, ...args),
    deleteCard: (...args: Parameters<DeleteCard>) =>
      ipcRenderer.invoke(Communication.DELETE_CARD, ...args),
    getCardsByCustomerId: (...args: Parameters<GetCardsByCustomerId>) =>
      ipcRenderer.invoke(Communication.GET_CARDS_BY_CUSTOMER_ID, ...args),
    getCardsByCompanyId: (...args: Parameters<GetCardsByCompanyId>) =>
      ipcRenderer.invoke(Communication.GET_CARDS_BY_COMPANY_ID, ...args),

    // NOTE: Customer
    getCustomers: (...args: Parameters<GetCustomers>) =>
      ipcRenderer.invoke(Communication.GET_CUSTOMERS, ...args),
    getCustomerById: (...args: Parameters<GetCustomerById>) =>
      ipcRenderer.invoke(Communication.GET_CUSTOMER_BY_ID, ...args),
    createCustomer: (...args: Parameters<CreateCustomer>) =>
      ipcRenderer.invoke(Communication.CREATE_CUSTOMER, ...args),
    updateCustomer: (...args: Parameters<UpdateCustomer>) =>
      ipcRenderer.invoke(Communication.UPDATE_CUSTOMER, ...args),
    deleteCustomer: (...args: Parameters<DeleteCustomer>) =>
      ipcRenderer.invoke(Communication.DELETE_CUSTOMER, ...args),

    // NOTE: Invoice
    getInvoices: (...args: Parameters<GetInvoices>) =>
      ipcRenderer.invoke(Communication.GET_INVOICES, ...args),
    getInvoicesByCardId: (...args: Parameters<GetInvoicesByCardId>) =>
      ipcRenderer.invoke(Communication.GET_INVOICES_BY_CARD_ID, ...args),
    getInvoicesByCustomerId: (...args: Parameters<GetInvoicesByCustomerId>) =>
      ipcRenderer.invoke(Communication.GET_INVOICES_BY_CUSTOMER_ID, ...args),
    getInvoiceById: (...args: Parameters<GetInvoiceById>) =>
      ipcRenderer.invoke(Communication.GET_INVOICE_BY_ID, ...args),
    createInvoice: (...args: Parameters<CreateInvoice>) =>
      ipcRenderer.invoke(Communication.CREATE_INVOICE, ...args),
    updateInvoice: (...args: Parameters<UpdateInvoice>) =>
      ipcRenderer.invoke(Communication.UPDATE_INVOICE, ...args),
    deleteInvoice: (...args: Parameters<DeleteInvoice>) =>
      ipcRenderer.invoke(Communication.DELETE_INVOICE, ...args)

    // TODO: File

    // TODO: Home
  })
} catch (error) {
  console.error(error)
}
