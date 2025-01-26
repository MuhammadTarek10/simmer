export class Communication {
  // NOTE: Company
  static GET_COMPANIES = 'getCompanies'
  static GET_COMPANY_BY_ID = 'getCompany'
  static CREATE_COMPANY = 'createCompany'
  static UPDATE_COMPANY = 'updateCompany'
  static DELETE_COMPANY = 'deleteCompany'

  // NOTE: Card
  static GET_CARDS = 'getCards'
  static GET_CARD_BY_ID = 'getCard'
  static CREATE_CARD = 'createCard'
  static UPDATE_CARD = 'updateCard'
  static DELETE_CARD = 'deleteCard'

  // NOTE: Customer
  static GET_CUSTOMERS = 'getCustomers'
  static GET_CUSTOMER_BY_ID = 'getCustomer'
  static CREATE_CUSTOMER = 'createCustomer'
  static UPDATE_CUSTOMER = 'updateCustomer'
  static DELETE_CUSTOMER = 'deleteCustomer'

  // NOTE: Invoice
  static GET_INVOICES = 'getInvoices'
  static GET_INVOICE_BY_ID = 'getInvoice'
  static CREATE_INVOICE = 'createInvoice'
  static UPDATE_INVOICE = 'updateInvoice'
  static DELETE_INVOICE = 'deleteInvoice'
  static GENERATE_INVOICES = 'generateInvoices'
  static GET_INVOICES_BY_CUSTOMER_ID = 'getInvoicesByCustomerId'
  static GET_INVOICES_BY_CARD_ID = 'getInvoicesByCardId'
  static PAY_INVOICE = 'payInvoice'
  static PAY_PARTIAL_INVOICE = 'payPartialInvoice'

  // NOTE: File
  static IMPORT_FILE = 'importFile'
  static EXPORT_FILE = 'exportFile'
}
