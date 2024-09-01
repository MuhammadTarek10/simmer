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
  GetCardsFromCompanyId,
  GetCardsFromCustomerId,
  GetCompanies,
  GetCompany,
  GetCustomer,
  GetCustomers,
  GetInvoice,
  GetInvoices,
  GetLists,
  GetOffers,
  GetUnOccupiedCards,
  UpdateCard,
  UpdateCompany,
  UpdateCustomer,
  UpdateInvoice,
  UpdateOffer,
  UpdatePaymentInvoices
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
      getUnOccupiedCards: GetUnOccupiedCards
      getCard: GetCard
      getCardsFromCompanyId: GetCardsFromCompanyId
      getCardsFromCustomerId: GetCardsFromCustomerId
      addCard: AddCard
      updateCard: UpdateCard
      deleteCard: DeleteCard

      // * List
      getList: GetLists

      // * Invoices
      updatePaymentInvoices: UpdatePaymentInvoices
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
