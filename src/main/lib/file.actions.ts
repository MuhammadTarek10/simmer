import { convertStringToDate, getCardType } from '@shared/converters'
import {
  toCardMain,
  toCompanyMain,
  toCompanyRenderer,
  toCustomerMain,
  toCustomerRenderer,
  toInvoiceMain,
  toOfferMain,
  toOfferRenderer
} from '@shared/mappers'
import { CardInfo, CompanyInfo, InvoiceInfo, OfferInfo, TempCardInfo } from '@shared/models'
import { FileSchema } from '@shared/types'
import { prisma } from './database'

export const enterToDB = async (data: FileSchema[]) => {
  console.log(data)

  try {
    // Create entities in parallel to improve performance
    const customerPromises = data.map(async (element) => {
      const customer = makeCustomers(element)
      const createdCustomer = await prisma.customer.create({ data: toCustomerMain(customer) })
      const invoice = makeInvoice(createdCustomer, customer.paid)
      await prisma.invoice.create({ data: toInvoiceMain(invoice) })
    })

    const companyPromises = data.map(async (element) => {
      const company = makeCompanies(element)
      await prisma.company.create({ data: toCompanyMain(company) })
    })

    const offerPromises = data.map(async (element) => {
      const offer = makeOffers(element)
      await prisma.offer.create({ data: toOfferMain(offer) })
    })

    const cardPromises = data.map(async (element) => {
      const tempCard = makeCards(element)
      const cardInfo = await makeCardInfo(tempCard)
      console.log(cardInfo)

      await prisma.card.create({ data: toCardMain(cardInfo) })
    })

    // Await all promises to handle async operations
    await Promise.all([...customerPromises, ...companyPromises, ...offerPromises, ...cardPromises])
    return true
  } catch (e) {
    console.error('Error entering data to database:', e) // Improved error logging
    return false
  }
}

const makeCustomers = (element: FileSchema) => {
  return {
    name: element.name,
    national_id: element.national_id,
    grand_name: element.grand_name,
    address: element.address,
    paid: Number(element.paid)
  }
}

const makeCompanies = (element: FileSchema): CompanyInfo => {
  return {
    name: element.company,
    invoice_date: element.company_invoice_date
  }
}

const makeOffers = (element: FileSchema): OfferInfo => {
  return {
    name: element.offer_name,
    end_date: convertStringToDate(element.offer_end_date),
    percentage: Number(element.offer_percentage)
  }
}

const makeCards = (element: FileSchema): TempCardInfo => {
  return {
    card_number: element.card_number,
    card_type: getCardType(element.card_number),
    start_date: element.card_start_date,
    price_before_vat: Number(element.price_before_vat),
    price_after_vat: Number(element.price_after_vat),
    company_name: element.company,
    offer_name: element.offer_name,
    customer_national_id: element.national_id
  }
}

const makeInvoice = (customer: any, amount: number): InvoiceInfo => {
  return {
    customer: customer,
    amount: amount
  }
}

const makeCardInfo = async (tempCard: TempCardInfo): Promise<CardInfo> => {
  const customer = await prisma.customer.findFirst({
    where: {
      national_id: tempCard.customer_national_id
    }
  })

  const company = await prisma.company.findFirst({
    where: {
      name: tempCard.company_name
    }
  })

  const offer = await prisma.offer.findFirst({
    where: {
      name: tempCard.offer_name
    }
  })

  return {
    card_number: tempCard.card_number,
    card_type: tempCard.card_type,
    start_date: tempCard.start_date,
    price_before_vat: Number(tempCard.price_before_vat),
    price_after_vat: Number(tempCard.price_after_vat),
    company: toCompanyRenderer(company),
    offer: offer != null ? toOfferRenderer(offer) : undefined,
    customer: customer != null ? toCustomerRenderer(customer) : undefined
  }
}
