import CardForm from '@/components/forms/CardForm'
import CompanyForm from '@/components/forms/CompanyForm'
import CustomerForm from '@/components/forms/CustomerForm'
import { requireAuth } from '@shared/actions/auth.actions'
import React from 'react'
import { defer, useLoaderData } from 'react-router-dom'

export async function editingLoader({ params }) {
  await requireAuth()
  const { id, type } = params
  let component
  if (type === 'company') {
    const company = await window.context.getCompany(id)
    component = <CompanyForm company={company} />
  } else if (type === 'card') {
    const card = await window.context.getCard(id)
    component = <CardForm card={card} />
  } else if (type === 'customer') {
    const customer = await window.context.getCustomer(id)
    component = <CustomerForm customer={customer} />
  }

  return defer({ component: component })
}

const Editing = () => {
  const { component } = useLoaderData() as { component: React.ReactNode }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-5xl">تعديل</h1>
      </div>
      {component}
    </div>
  )
}
export default Editing