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
  GetCompanies,
  GetCompany,
  GetCustomer,
  GetCustomers,
  GetInvoices,
  GetList,
  GetOffers,
  GetUnOccupiedCards,
  UpdateCard,
  UpdateCompany,
  UpdateCustomer,
  UpdateInvoice
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
    addCustomer: (...args: Parameters<AddCustomer>) => ipcRenderer.invoke('addCustomer', ...args),
    updateCustomer: (...args: Parameters<UpdateCustomer>) =>
      ipcRenderer.invoke('updateCustomer', ...args),
    deleteCustomer: (...args: Parameters<DeleteCustomer>) =>
      ipcRenderer.invoke('deleteCustomer', ...args),

    // * Cards
    getCards: (...args: Parameters<GetCards>) => ipcRenderer.invoke('getCards', ...args),
    getCard: (...args: Parameters<GetCard>) => ipcRenderer.invoke('getCard', ...args),
    getUnOccupiedCards: (...args: Parameters<GetUnOccupiedCards>) =>
      ipcRenderer.invoke('getUnOccupiedCards', ...args),

    addCard: (...args: Parameters<AddCard>) => ipcRenderer.invoke('addCard', ...args),
    updateCard: (...args: Parameters<UpdateCard>) => ipcRenderer.invoke('updateCard', ...args),
    deleteCard: (...args: Parameters<DeleteCard>) => ipcRenderer.invoke('deleteCard', ...args),

    // * List
    getList: (...args: Parameters<GetList>) => ipcRenderer.invoke('getList', ...args),

    // * Invoices
    getInvoices: (...args: Parameters<GetInvoices>) => ipcRenderer.invoke('getInvoices', ...args),
    addInvoice: (...args: Parameters<AddInvoice>) => ipcRenderer.invoke('addInvoice', ...args),
    updateInvoice: (...args: Parameters<UpdateInvoice>) =>
      ipcRenderer.invoke('updateInvoice', ...args),
    deleteInvoice: (...args: Parameters<DeleteInvoice>) =>
      ipcRenderer.invoke('deleteInvoice', ...args),

    // * Offers
    getOffers: (...args: Parameters<GetOffers>) => ipcRenderer.invoke('getOffers', ...args),
    addOffer: (...args: Parameters<AddOffer>) => ipcRenderer.invoke('addOffer', ...args)
  })
} catch (e) {
  console.error(e)
}
