import { contextBridge, ipcRenderer } from 'electron'
import {
  AddCard,
  AddCompany,
  AddCustomer,
  AddInvoice,
  AddOffer,
  DeleteCard,
  DeleteCompany,
  DeleteCustomer,
  DeleteInvoice,
  GetCard,
  GetCards,
  GetCardsFromCompanyId,
  GetCardsFromCustomerId,
  GetCompanies,
  GetCompany,
  GetCustomer,
  GetCustomerFromInvoiceId,
  GetCustomers,
  GetInvoice,
  GetInvoices,
  GetInvoicesByCustomerId,
  GetList,
  GetOffers,
  GetUnOccupiedCards,
  RemoveCardFromCustomer,
  UpdateCard,
  UpdateCompany,
  UpdateCustomer,
  UpdateInvoice,
  UpdatePaymentInvoices
} from '../shared/types'

if (!process.contextIsolated) {
  throw new Error('The preload script should be context isolated')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // * Company
    getCompanies: (...args: Parameters<GetCompanies>) =>
      ipcRenderer.invoke('getCompanies', ...args),
    getCompany: (...args: Parameters<GetCompany>) => ipcRenderer.invoke('getCompany', ...args),
    addCompany: (...args: Parameters<AddCompany>) => ipcRenderer.invoke('addCompany', ...args),
    updateCompany: (...args: Parameters<UpdateCompany>) =>
      ipcRenderer.invoke('updateCompany', ...args),
    deleteCompany: (...args: Parameters<DeleteCompany>) =>
      ipcRenderer.invoke('deleteCompany', ...args),

    // * Customer
    getCustomers: (...args: Parameters<GetCustomers>) =>
      ipcRenderer.invoke('getCustomers', ...args),
    getCustomer: (...args: Parameters<GetCustomer>) => ipcRenderer.invoke('getCustomer', ...args),
    getCustomerFromInvoiceId: (...args: Parameters<GetCustomerFromInvoiceId>) =>
      ipcRenderer.invoke('getCustomerFromInvoiceId', ...args),
    addCustomer: (...args: Parameters<AddCustomer>) => ipcRenderer.invoke('addCustomer', ...args),
    updateCustomer: (...args: Parameters<UpdateCustomer>) =>
      ipcRenderer.invoke('updateCustomer', ...args),
    deleteCustomer: (...args: Parameters<DeleteCustomer>) =>
      ipcRenderer.invoke('deleteCustomer', ...args),
    removeCardFromCustomer: (...args: Parameters<RemoveCardFromCustomer>) =>
      ipcRenderer.invoke('removeCardFromCustomer', ...args),

    // * Cards
    getCards: (...args: Parameters<GetCards>) => ipcRenderer.invoke('getCards', ...args),
    getUnOccupiedCards: (...args: Parameters<GetUnOccupiedCards>) =>
      ipcRenderer.invoke('getUnOccupiedCards', ...args),
    getCard: (...args: Parameters<GetCard>) => ipcRenderer.invoke('getCard', ...args),
    getCardsFromCompanyId: (...args: Parameters<GetCardsFromCompanyId>) =>
      ipcRenderer.invoke('getCardsFromCompanyId', ...args),
    getCardsFromCustomerId: (...args: Parameters<GetCardsFromCustomerId>) =>
      ipcRenderer.invoke('getCardsFromCustomerId', ...args),

    addCard: (...args: Parameters<AddCard>) => ipcRenderer.invoke('addCard', ...args),
    updateCard: (...args: Parameters<UpdateCard>) => ipcRenderer.invoke('updateCard', ...args),
    deleteCard: (...args: Parameters<DeleteCard>) => ipcRenderer.invoke('deleteCard', ...args),

    // * List
    getList: (...args: Parameters<GetList>) => ipcRenderer.invoke('getList', ...args),

    // * Invoices
    updatePaymentInvoices: (...args: Parameters<UpdatePaymentInvoices>) =>
      ipcRenderer.invoke('updatePaymentInvoices', ...args),
    getInvoices: (...args: Parameters<GetInvoices>) => ipcRenderer.invoke('getInvoices', ...args),
    getInvoicesByCustomerId: (...args: Parameters<GetInvoicesByCustomerId>) =>
      ipcRenderer.invoke('getInvoicesByCustomerId', ...args),
    getInvoice: (...args: Parameters<GetInvoice>) => ipcRenderer.invoke('getInvoice', ...args),
    getInvoicesGrouped: (...args: Parameters<GetInvoice>) =>
      ipcRenderer.invoke('getInvoicesGrouped', ...args),
    addInvoice: (...args: Parameters<AddInvoice>) => ipcRenderer.invoke('addInvoice', ...args),
    updateInvoice: (...args: Parameters<UpdateInvoice>) =>
      ipcRenderer.invoke('updateInvoice', ...args),
    deleteInvoice: (...args: Parameters<DeleteInvoice>) =>
      ipcRenderer.invoke('deleteInvoice', ...args),

    // * Offers
    getOffers: (...args: Parameters<GetOffers>) => ipcRenderer.invoke('getOffers', ...args),
    addOffer: (...args: Parameters<AddOffer>) => ipcRenderer.invoke('addOffer', ...args),

    // * File
    importFile: (...args: Parameters<any>) => ipcRenderer.invoke('importFile', ...args)
  })
} catch (e) {
  console.error(e)
}
