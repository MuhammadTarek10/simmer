import { contextBridge, ipcRenderer } from 'electron'
import { GetCompanies } from '@shared/constants/types'
import { Communication } from '@shared/constants/communication'

if (!process.contextIsolated) {
  throw new Error('The preload script should be context isolated')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // NOTE: Company
    getCompanies: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.GET_COMPANIES, ...args),
    getCompanyById: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.GET_COMPANY_BY_ID, ...args),
    createCompany: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.CREATE_COMPANY, ...args),
    updateCompany: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.UPDATE_COMPANY, ...args),
    deleteCompany: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.DELETE_COMPANY, ...args),

    // NOTE: Card

    // NOTE: Customer

    // NOTE: Invoice
    getInvoices: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.GET_INVOICES, ...args),
    getInvoicesByCardId: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.GET_INVOICES_BY_CARD_ID, ...args),
    getInvoicesByCustomerId: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.GET_INVOICES_BY_CUSTOMER_ID, ...args),
    getInvoiceById: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.GET_INVOICE_BY_ID, ...args),
    createInvoice: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.CREATE_INVOICE, ...args),
    updateInvoice: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.UPDATE_INVOICE, ...args),
    deleteInvoice: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke(Communication.DELETE_INVOICE, ...args)

    // NOTE: File
  })
} catch (error) {
  console.error(error)
}
