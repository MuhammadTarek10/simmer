import { requireAuth } from '@shared/auth.actions'
import { Company } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'

export async function companyDetailsLoader({ params }) {
  console.log(params)
  await requireAuth()
  return defer({ company: { id: '123', name: 'Company Name' } })
}

const CompanyDetails = () => {
  const { company } = useLoaderData() as { company: Company }
  return <div>{company.name}</div>
}
export default CompanyDetails
