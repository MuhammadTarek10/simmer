import { ICardService } from '@shared/interfaces/icard.service'
import { ICompanyService } from '@shared/interfaces/icompany.service'
import { ICustomerService } from '@shared/interfaces/icustomer.service'
import { IInvoiceService } from '@shared/interfaces/iincoive.service'
import { InvoiceService } from './invoice/invoice.service'
import { CustomerService } from './customer/customer.service'
import { CompanyService } from './company/company.service'
import { CardService } from './card/card.service'

class ServicesDI {
  public invoiceService: IInvoiceService
  public customerService: ICustomerService
  public companyService: ICompanyService
  public cardService: ICardService

  constructor() {
    this.invoiceService = new InvoiceService()
    this.customerService = new CustomerService()
    this.companyService = new CompanyService()
    this.cardService = new CardService()
  }
}

export const di = new ServicesDI()
