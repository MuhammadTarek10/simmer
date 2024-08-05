import { toCustomerMain, toCustomerRenderer } from '@shared/mappers'
import { CustomerInfo } from '@shared/models'
import { prisma } from './database'

export async function addCustomer(customer: CustomerInfo): Promise<void> {
  await prisma.customer.create({
    data: toCustomerMain(customer)
  })
}

export async function getCustomers(): Promise<CustomerInfo[]> {
  const customers = await prisma.customer.findMany()
  return customers.map((customer) => toCustomerRenderer(customer))
}

export async function getCustomer(id: string): Promise<CustomerInfo> {
  const customer = await prisma.customer.findUnique({ where: { id } })
  if (!customer) throw new Error('Customer not found')
  return toCustomerRenderer(customer)
}

export async function updateCustomer(customer: CustomerInfo): Promise<void> {
  await prisma.customer.update({
    where: { id: customer.id },
    data: toCustomerMain(customer)
  })
}

export async function deleteCustomer(id: string): Promise<void> {
  await prisma.customer.delete({
    where: { id }
  })
}
