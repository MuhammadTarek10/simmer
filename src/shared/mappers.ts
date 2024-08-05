import { CompanyInfo, CustomerInfo, InvoiceInfo } from '@shared/models'

export const toCompanyRenderer = (company: any) => {
  return {
    id: company.id,
    name: company.name,
    invoice_date: company.invoice_date,
    phone: company.phone,
    cards: company.cards,
    comment: company.comment
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

export const toCustomerRenderer = (customer: any) => {
  return {
    id: customer.id,
    name: customer.name,
    national_id: customer.national_id,
    grand_name: customer.grand_name,
    address: customer.address,
    cards: customer.cards,
    comment: customer.comment || ''
  }
}

export const toCustomerMain = (customer: CustomerInfo) => {
  return {
    name: customer.name,
    national_id: customer.national_id,
    grand_name: customer.grand_name,
    address: customer.address,
    comment: customer.comment
  }
}

export const toCardRenderer = (card: any) => {
  return {
    id: card.id,
    card_number: card.card_number,
    card_type: card.card_type,
    start_date: card.start_date,
    company: card.company,
    offer: card.offer,
    offer_end_date: card.offer_end_date,
    price_before_vat: card.price_before_vat,
    price_after_vat: card.price_after_vat,
    comment: card.comment
  }
}

export const toCardMain = (card: any) => {
  return {
    card_number: card.card_number,
    start_date: card.start_date,
    price_before_vat: Number(card.price_before_vat),
    price_after_vat: Number(card.price_after_vat),
    card_type: card.card_type,
    sell_date: card.sell_date,
    company_id: card.company.id,
    offer_id: card.offer?.id,
    comment: card.comment
  }
}

export const toListRenderer = (list: any) => {
  return {
    id: list.id,
    name: list.name,
    cards: list.cards
  }
}

export const toInvoiceRenderer = (invoice: any) => {
  return {
    id: invoice.id,
    customer: invoice.customer,
    amount: invoice.amount,
    invoice_date: invoice.invoice_date,
    comment: invoice.comment
  }
}

export const toInvoiceMain = (invoice: InvoiceInfo) => {
  return {
    customer_id: invoice.customer.id,
    amount: invoice.amount,
    comment: invoice.comment
  }
}

export const toOfferRenderer = (offer: any) => {
  return {
    id: offer.id,
    name: offer.name,
    period_in_month: offer.period_on_month,
    percentage: offer.percentage,
    comment: offer.comment
  }
}

export const toOfferMain = (offer: any) => {
  return {
    name: offer.name,
    period_in_month: Number(offer.period_in_month),
    percentage: Number(offer.percentage),
    comment: offer.comment
  }
}
