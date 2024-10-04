import { convertStringToDate, getCardType } from '@shared/converters'
import {
  toCardDB,
  toCompanyDB,
  toCompanyInfo,
  toCustomerDB,
  toCustomerInfo,
  toInvoiceDB,
  toOfferDB,
  toOfferInfo
} from '@shared/mappers'
import {
  CardInfo,
  CompanyInfo,
  CustomerInfo,
  InvoiceInfo,
  OfferInfo,
  TempCardInfo
} from '@shared/models'
import { FileSchema } from '@shared/types'
import { prisma } from './database'

export const enterToDB = async (data: FileSchema[]) => {
  try {
    // Create entities in parallel to improve performance
    data.map(async (element) => {
      await addCard(element)
    })
    return true
  } catch (e) {
    console.error('Error entering data to database:', e) // Improved error logging
    return false
  }
}

const makeCustomer = (element: FileSchema) => {
  return {
    name: element.name,
    national_id: element.national_id.toString(),
    grand_name: element.grand_name,
    address: element.address,
    paid: Number(element.paid)
  }
}

const makeCompany = (element: FileSchema): CompanyInfo => {
  return {
    name: element.company,
    invoice_date: element.company_invoice_date
  }
}

const makeOffer = (element: FileSchema): OfferInfo => {
  return {
    name: element.offer_name,
    end_date: convertStringToDate(element.offer_end_date),
    percentage: Number(element.offer_percentage)
  }
}

const makeTempCard = (element: FileSchema): TempCardInfo => {
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
    amount: Number(amount)
  }
}

const makeCardInfo = (
  tempCard: TempCardInfo,
  company: CompanyInfo,
  customer: CustomerInfo | null,
  offer: OfferInfo | null
): CardInfo => {
  return {
    card_number: tempCard.card_number,
    card_type: tempCard.card_type,
    start_date: tempCard.start_date,
    price_before_vat: Number(tempCard.price_before_vat),
    price_after_vat: Number(tempCard.price_after_vat),
    company: company,
    offer: offer != null ? offer : undefined,
    customer: customer != null ? customer : undefined
  }
}

const addCustomer = async (schema: FileSchema): Promise<CustomerInfo | null> => {
  if (schema.national_id == null) return null

  let customer = await prisma.customer.findFirst({
    where: {
      national_id: schema.national_id.toString()
    }
  })

  if (customer == null) {
    try {
      customer = await prisma.customer.create({ data: toCustomerDB(makeCustomer(schema)) })
    } catch (e) {
      return null
    }
  }

  await addInvoice(customer, schema.paid)
  return toCustomerInfo(customer)
}

const addInvoice = async (customer: any, amount: any) => {
  const invoice = makeInvoice(customer, amount)

  await prisma.invoice.create({ data: toInvoiceDB(invoice) })
}

const addCompany = async (schema: FileSchema): Promise<CompanyInfo> => {
  let company = await prisma.company.findFirst({
    where: {
      name: schema.company
    }
  })

  if (company == null) {
    company = await prisma.company.create({ data: toCompanyDB(makeCompany(schema)) })
  }

  return toCompanyInfo(company)
}
const addOffer = async (schema: FileSchema): Promise<OfferInfo | null> => {
  let offer = await prisma.offer.findFirst({ where: { name: schema.offer_name } })

  if (offer == null) {
    try {
      offer = await prisma.offer.create({ data: toOfferDB(makeOffer(schema)) })
    } catch (e) {
      return null
    }
  }

  return toOfferInfo(offer)
}
const addCard = async (schema: FileSchema) => {
  const card = await prisma.card.findFirst({ where: { card_number: schema.card_number } })
  if (card != null) return

  const company = await addCompany(schema)
  const offer = await addOffer(schema)
  const customer = await addCustomer(schema)

  const tempCard = makeTempCard(schema)
  const newCard = makeCardInfo(tempCard, company, customer, offer)

  await prisma.card.create({ data: toCardDB(newCard) })
}
