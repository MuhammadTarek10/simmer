import { toCustomerDB, toCustomerInfo } from '@shared/mappers'
import { CustomerInfo } from '@shared/models'
import { prisma } from './database'

export async function addCustomer(customer: CustomerInfo): Promise<void> {
  try {
    await prisma.customer.create({
      data: toCustomerDB(customer)
    })
  } catch (error) {
    console.error('Failed to add customer:', error)
    if ((error as { code?: string }).code === 'P2002') {
      // Prisma unique constraint error
      throw new Error('Customer with this national ID already exists.')
    }
    throw new Error('Failed to add customer. Please try again.')
  }
}

export async function getCustomers(): Promise<CustomerInfo[]> {
  const customers = await prisma.customer.findMany({
    include: {
      cards: true
    }
  })
  return customers.map((customer) => toCustomerInfo(customer))
}

export async function getCustomer(id: string): Promise<CustomerInfo> {
  const customer = await prisma.customer.findUnique({ where: { id }, include: { cards: true } })
  if (!customer) throw new Error('Customer not found')
  return toCustomerInfo(customer)
}

export async function getCustomerFromInvoiceId(id: string) {
  const customer = await prisma.customer.findFirst({
    where: {
      invoices: {
        some: {
          id
        }
      }
    }
  })
  if (!customer) throw new Error('Customer not found')
  return toCustomerInfo(customer)
}

export async function updateCustomer(customer: CustomerInfo): Promise<void> {
  try {
    await prisma.customer.update({
      where: { id: customer.id },
      data: toCustomerDB(customer)
    })
  } catch (error) {
    console.error('Failed to update customer:', error)
    if ((error as { code?: string }).code === 'P2025') {
      // Record not found
      throw new Error('Customer not found.')
    }
    throw new Error('Failed to update customer information. Please try again.')
  }
}

export async function deleteCustomer(id: string): Promise<void> {
  await prisma.customer.delete({
    where: { id }
  })
}

export async function removeCardFromCustomer(cardId: string, customerId: string) {
  await prisma.customer.update({
    where: { id: customerId },
    data: {
      cards: {
        disconnect: {
          id: cardId
        }
      }
    }
  })
}
