import { CompanyInfo } from '@shared/models'

export const toCompanyRenderer = (company: any) => {
  return {
    id: company.id,
    name: company.name,
    invoice_date: company.invoice_date,
    phone: company.phone || '',
    comment: company.comment || ''
  }
}

export const toCompanyMain = (company: CompanyInfo) => {
  return {
    name: company.name,
    invoice_date: company.invoice_date || '',
    phone: company.phone,
    comment: company.comment
  }
}
