import {
  CompanyInfo,
  CustomerInfo,
  InvoiceData,
  InvoiceInfo,
  ListData,
  ListInfo
} from '@shared/models'
import { createHash } from 'crypto'
import { convertDateToString } from './converters'

export const hash = (value: string) => createHash('sha256').update(value).digest('hex')

export const toCompanyInfo = (company: any) => {
  return {
    id: company.id,
    name: company.name,
    invoice_date: company.invoice_date,
    phone: company.phone,
    cards: company.cards,
    comment: company.comment
  }
}

export const toCompanyDB = (company: CompanyInfo) => {
  return {
    name: company.name.trim(),
    name_clean: hash(company.name.trim()),
    invoice_date: company.invoice_date || '',
    phone: company.phone,
    comment: company.comment
  }
}

export const toCustomerInfo = (customer: any) => {
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

export const toCustomerDB = (customer: CustomerInfo) => {
  return {
    name: customer.name,
    name_clean: hash(customer.name.trim()),
    national_id: customer.national_id,
    grand_name: customer.grand_name,
    address: customer.address,
    comment: customer.comment
  }
}

export const toCardInfo = (card: any) => {
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

export const toCardDB = (card: any) => {
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

export const groupByMonth = (invoices: any[], all: boolean): ListData[] => {
  const grouped = invoices.reduce((acc: any, invoice: any) => {
    const monthOnly = new Date(invoice.invoice_date).getMonth() + 1
    const year = new Date(invoice.invoice_date).getFullYear()

    const month = `${year}-${monthOnly}`

    if (!acc[month]) {
      acc[month] = []
    }
    acc[month].push(invoice)
    return acc
  }, {})
  return Object.entries(grouped).map(([month, invoices]) => {
    return {
      month: month,
      info: toListInfoInfo(invoices as any, all)
    }
  })
}

export const toListInfoInfo = (invoices: any[], all: boolean): ListInfo[] => {
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

  const result = grouped.map((group: any) => {
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

  const sortedResult = result.sort((a, b) => {
    if (a.remaining > b.remaining) return -1
    if (a.remaining < b.remaining) return 1
    return 0
  })

  if (all) return sortedResult
  return sortedResult.filter((info) => info.remaining > 0)
}

export const groupInvoicesByName = (invoices: any): InvoiceData[] => {
  const groupedByCustomerId = {}

  invoices.forEach((invoice) => {
    const customerId = invoice.customer.id

    if (!groupedByCustomerId[customerId]) {
      groupedByCustomerId[customerId] = []
    }

    groupedByCustomerId[customerId].push({
      id: invoice.id,
      customer: invoice.customer,
      amount: invoice.amount,
      invoice_date: convertDateToString(invoice.invoice_date),
      comment: invoice.comment
    })
  })

  const grouped = Object.values(groupedByCustomerId)

  const result = grouped.map((group: any) => {
    const total = group.reduce((acc, invoice) => acc + invoice.amount, 0)

    return {
      name: group[0].customer.name,
      total: total,
      lastMonthTotal: group[group.length - 1].amount,
      info: group
    }
  })

  return result
}

export const toInvoiceInfo = (invoice: any) => {
  return {
    id: invoice.id,
    customer: invoice.customer,
    amount: invoice.amount,
    invoice_date: convertDateToString(invoice.invoice_date),
    comment: invoice.comment
  }
}

export const toInvoiceDB = (invoice: InvoiceInfo) => {
  return {
    customer_id: invoice.customer.id,
    invoice_date:
      invoice.invoice_date === undefined ? new Date(Date.now()) : new Date(invoice.invoice_date!),
    amount: invoice.amount !== undefined ? Number(invoice.amount) : 0,
    comment: invoice.comment
  }
}

export const toOfferInfo = (offer: any) => {
  return {
    id: offer.id,
    name: offer.name,
    end_date: offer.end_date,
    percentage: offer.percentage,
    comment: offer.comment
  }
}

export const toOfferDB = (offer: any) => {
  return {
    name: offer.name,
    end_date: offer.end_date,
    percentage: offer.percentage,
    comment: offer.comment
  }
}
