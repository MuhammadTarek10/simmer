import { CustomerInfo } from '@shared/models'

export async function addCustomer(customer: CustomerInfo): Promise<void> {
  await window.context.addCustomer(customer)
}

export async function getCustomers(): Promise<CustomerInfo[]> {
  return await window.context.getCustomers()
}

export async function getCustomer(id: string): Promise<CustomerInfo> {
  return await window.context.getCustomer(id)
}

export async function getCustomerFromInvoiceId(id: string) {
  return await window.context.getCustomerFromInvoiceId(id)
}

export async function updateCustomer(customer: CustomerInfo): Promise<void> {
  await window.context.updateCustomer(customer)
}

export async function deleteCustomer(id: string): Promise<void> {
  await window.context.deleteCustomer(id)
}

export async function removeCardFromCustomer(cardId: string, customerId: string) {
  await window.context.removeCardFromCustomer(cardId, customerId)
}
