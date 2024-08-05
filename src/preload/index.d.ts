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
  DeleteOffer,
  GetCard,
  GetCards,
  GetCompanies,
  GetCompany,
  GetCustomer,
  GetCustomers,
  GetInvoice,
  GetInvoices,
  GetLists,
  GetOffers,
  UpdateCard,
  UpdateCompany,
  UpdateCustomer,
  UpdateInvoice,
  UpdateOffer
} from '@shared/types'
import { GetOffer } from '../shared/types'
declare global {
  interface Window {
    context: {
      // * Company
      getCompanies: GetCompanies
      getCompany: GetCompany
      addCompany: AddCompany
      updateCompany: UpdateCompany
      deleteCompany: DeleteCompany

      // * Customer
      getCustomers: GetCustomers
      getCustomer: GetCustomer
      addCustomer: AddCustomer
      updateCustomer: UpdateCustomer
      deleteCustomer: DeleteCustomer

      // * Cards
      getCards: GetCards
      getCard: GetCard
      addCard: AddCard
      updateCard: UpdateCard
      deleteCard: DeleteCard

      // * List
      getList: GetLists

      // * Invoices
      getInvoices: GetInvoices
      getInvoice: GetInvoice
      addInvoice: AddInvoice
      updateInvoice: UpdateInvoice
      deleteInvoice: DeleteInvoice

      // * Offers
      getOffers: GetOffers
      getOffer: GetOffer
      addOffer: AddOffer
      updateOffer: UpdateOffer
      deleteOffer: DeleteOffer
    }
  }
}
