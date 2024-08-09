import { CompanyInfo, CustomerInfo, InvoiceInfo, ListData, ListInfo } from '@shared/models'
import { convertDateToString } from './converters'

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
    customer: card.customer,
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
    price_before_vat: card.price_before_vat,
    price_after_vat: card.price_after_vat,
    card_type: card.card_type,
    sell_date: card.sell_date,
    company_id: card.company.id,
    customer_id: card.customer?.id,
    offer_id: card.offer?.id,
    comment: card.comment
  }
}

export const groupByMonth = (invoices: any[]): ListData[] => {
  const grouped = invoices.reduce((acc: any, invoice: any) => {
    const month = new Date(invoice.invoice_date).getMonth() + 1

    if (!acc[month]) {
      acc[month] = []
    }
    acc[month].push(invoice)
    return acc
  }, {})
  return Object.entries(grouped).map(([month, invoices]) => {
    return {
      month: month,
      info: toListInfoRenderer(invoices as any)
    }
  })
}

export const toListInfoRenderer = (invoices: any[]): ListInfo[] => {
  const groupedByCustomerId = {}

  invoices.forEach((invoice) => {
    const customerId = invoice.customer.id

    if (!groupedByCustomerId[customerId]) {
      groupedByCustomerId[customerId] = []
    }

    groupedByCustomerId[customerId].push({
      customer_id: invoice.customer.id,
      name: invoice.customer.name,
      number_of_cards: invoice.customer.cards.length,
      paid: invoice.amount,
      comment: invoice.comment
    })
  })

  const grouped = Object.values(groupedByCustomerId)

  return grouped.map((group: any) => {
    const total = group.reduce((acc, info) => acc + (info.paid < 0 ? info.paid : 0), 0) * -1
    const totalPaid = group.reduce((acc, info) => acc + (info.paid > 0 ? info.paid : 0)!, 0)
    return {
      customer_id: group[0].customer_id,
      name: group[0].name,
      number_of_cards: group[0].number_of_cards,
      total: total,
      paid: totalPaid,
      remaining: total - totalPaid,
      comment: group
        .map((invoice) => invoice.comment)
        .filter((comment) => comment !== null)
        .join(' - ')
    }
  })
}

export const toInvoiceRenderer = (invoice: any) => {
  return {
    id: invoice.id,
    customer: invoice.customer,
    amount: invoice.amount,
    invoice_date: convertDateToString(invoice.invoice_date),
    comment: invoice.comment
  }
}

export const toInvoiceMain = (invoice: InvoiceInfo) => {
  return {
    customer_id: invoice.customer.id,
    invoice_date: new Date(invoice.invoice_date),
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
    period_in_month: offer.period_in_month,
    percentage: offer.percentage,
    comment: offer.comment
  }
}
