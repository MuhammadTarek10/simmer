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
  FileImport,
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
  GetLists,
  GetOffers,
  GetUnOccupiedCards,
  RemoveCardFromCustomer,
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
      getCustomerFromInvoiceId: GetCustomerFromInvoiceId
      addCustomer: AddCustomer
      updateCustomer: UpdateCustomer
      deleteCustomer: DeleteCustomer
      removeCardFromCustomer: RemoveCardFromCustomer

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
      getInvoicesByCustomerId: GetInvoicesByCustomerId
      getInvoicesGrouped: GetInvoices
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

      // * File
      importFile: FileImport
    }
  }
}
