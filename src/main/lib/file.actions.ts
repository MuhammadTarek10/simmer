import { convertStringToDate, getCardType } from '@shared/converters'
import {
  hashCompanyName,
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
import { toCardDB } from '../../shared/mappers'
import { prisma } from './database'

export const enterToDB = async (data: FileSchema[]) => {
  try {
    const batchSize = 5
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)
      for (const element of batch) {
        await addCard(element)
      }
    }
    return true
  } catch (e) {
    console.error('Error entering data to database:', e)
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

const makeInvoice = (customer: any, amount?: number): InvoiceInfo => {
  return {
    customer: customer,
    amount: amount !== undefined ? Number(amount) : 0
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
  if (schema.national_id === null) return null

  let customer = await prisma.customer.findFirst({
    where: {
      national_id: schema.national_id.toString()
    }
  })

  if (customer === null) {
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
  return await prisma.$transaction(
    async (tx) => {
      let company = await tx.company.findFirst({
        where: {
          name_clean: hashCompanyName(schema.company.trim())
        }
      })

      if (company === null) {
        company = await tx.company.create({ data: toCompanyDB(makeCompany(schema)) })
      }

      return toCompanyInfo(company)
    },
    {
      timeout: 10000
    }
  )
}
const addOffer = async (schema: FileSchema): Promise<OfferInfo | null> => {
  if (schema.offer_name === undefined || schema.offer_name === '') return null

  let offer = await prisma.offer.findFirst({ where: { name: schema.offer_name } })
  if (!offer) {
    offer = await prisma.offer.create({ data: toOfferDB(makeOffer(schema)) })
  }

  return toOfferInfo(offer)
}
const addCard = async (schema: FileSchema) => {
  const card = await prisma.card.findFirst({ where: { card_number: schema.card_number } })

  const company = await addCompany(schema)
  const offer = await addOffer(schema)
  const customer = await addCustomer(schema)

  const tempCard = makeTempCard(schema)
  const newCard = makeCardInfo(tempCard, company, customer, offer)

  if (card) {
    await prisma.card.update({
      where: { id: card.id },
      data: toCardDB(newCard)
    })
  } else {
    await prisma.card.create({ data: toCardDB(newCard) })
  }
}
