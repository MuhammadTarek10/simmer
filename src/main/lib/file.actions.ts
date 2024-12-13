import { convertStringToDate, getCardType } from '@shared/converters'
import {
  toCompanyDB,
  toCompanyInfo,
  toCustomerDB,
  toCustomerInfo,
  toInvoiceDB,
  toOfferDB,
  toOfferInfo,
  toCardDB
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
import { Prisma } from '@prisma/client'
import { prisma } from './database'

export const enterToDB = async (data: FileSchema[]) => {
  try {
    await prisma.$transaction(
      async (tx) => {
        for (const item of data) {
          await addCard(tx, item)
        }
      },
      { timeout: 10000 }
    )
    return true
  } catch (e) {
    console.error('Error entering data to database:', e)
    return false
  }
}

const makeCustomer = (element: FileSchema) => ({
  name: element.name,
  national_id: element.national_id,
  grand_name: element.grand_name,
  address: element.address,
  paid: Number(element.paid)
})

const makeCompany = (element: FileSchema): CompanyInfo => ({
  name: element.company,
  invoice_date: element.company_invoice_date
})

const makeOffer = (element: FileSchema): OfferInfo => ({
  name: element.offer_name,
  end_date: convertStringToDate(element.offer_end_date),
  percentage: Number(element.offer_percentage)
})

const makeTempCard = (element: FileSchema): TempCardInfo => ({
  card_number: element.card_number,
  card_type: getCardType(element.card_number),
  start_date: element.card_start_date,
  price_before_vat: Number(element.price_before_vat),
  price_after_vat: Number(element.price_after_vat),
  company_name: element.company,
  offer_name: element.offer_name,
  customer_national_id: element.national_id
})

const makeInvoice = (customer: any, card_number: string, amount?: number): InvoiceInfo => ({
  customer: customer,
  card_number: card_number,
  amount: amount !== undefined ? Number(amount) : 0
})

const makeCardInfo = (
  tempCard: TempCardInfo,
  company: CompanyInfo,
  customer: CustomerInfo | null,
  offer: OfferInfo | null
): CardInfo => ({
  card_number: tempCard.card_number,
  card_type: tempCard.card_type,
  start_date: tempCard.start_date,
  price_before_vat: Number(tempCard.price_before_vat),
  price_after_vat: Number(tempCard.price_after_vat),
  company: company,
  offer: offer != null ? offer : undefined,
  customer: customer != null ? customer : undefined
})

const addCustomer = async (
  tx: Prisma.TransactionClient,
  schema: FileSchema
): Promise<CustomerInfo | null> => {
  if (!schema.name) return null

  try {
    const customer = await tx.customer.upsert({
      where: { national_id: schema.national_id },
      update: {},
      create: toCustomerDB(makeCustomer(schema))
    })

    await addInvoice(tx, customer, schema.card_number, schema.paid)
    return toCustomerInfo(customer)
  } catch (e) {
    console.error(`Error adding customer with national_id: ${schema.national_id}`, e)
    return null
  }
}
const addInvoice = async (
  tx: Prisma.TransactionClient,
  customer: any,
  card_number: string,
  amount: number
) => {
  const invoice = makeInvoice(customer, card_number, amount)
  await tx.invoice.create({ data: toInvoiceDB(invoice) })
}

const addCompany = async (
  tx: Prisma.TransactionClient,
  schema: FileSchema
): Promise<CompanyInfo | null> => {
  let company = await tx.company.findFirst({ where: { name: schema.company.trim() } })
  if (!company) {
    try {
      company = await tx.company.create({ data: toCompanyDB(makeCompany(schema)) })
    } catch (e) {
      console.error('Error adding company to database:', e)
      return null
    }
  }
  return toCompanyInfo(company)
}

const addOffer = async (
  tx: Prisma.TransactionClient,
  schema: FileSchema
): Promise<OfferInfo | null> => {
  if (!schema.offer_name) return null

  let offer = await tx.offer.findFirst({ where: { name: schema.offer_name } })
  if (!offer) {
    try {
      offer = await tx.offer.create({ data: toOfferDB(makeOffer(schema)) })
    } catch (e) {
      console.error('Error adding offer to database:', e)
      return null
    }
  }
  return toOfferInfo(offer)
}

const addCard = async (tx: Prisma.TransactionClient, schema: FileSchema) => {
  const card = await tx.card.findFirst({ where: { card_number: schema.card_number } })

  const company = await addCompany(tx, schema)
  if (!company) return

  const offer = await addOffer(tx, schema)
  const customer = await addCustomer(tx, schema)

  const tempCard = makeTempCard(schema)
  const newCard = makeCardInfo(tempCard, company, customer, offer)

  if (card) {
    await tx.card.update({
      where: { id: card.id },
      data: toCardDB(newCard)
    })
  } else {
    await tx.card.create({ data: toCardDB(newCard) })
  }
}
