import {
  AddCard,
  AddCompany,
  AddCustomer,
  AddInvoice,
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
  GetInvoice,
  GetInvoices,
  GetLists,
  UpdateCard,
  UpdateCompany,
  UpdateCustomer,
  UpdateInvoice
} from '@shared/types'
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
    }
  }
}
