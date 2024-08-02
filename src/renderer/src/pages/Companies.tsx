import CompanyCard from '@/components/CompanyCard'
import { requireAuth } from '@shared/auth.actions'
import { Company } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'
import { mockCompanies } from '../mocks/dummy'

export async function companiesLoader() {
  await requireAuth()
  return defer({ companies: mockCompanies })
}

const Companies = () => {
  const { companies } = useLoaderData() as { companies: Company[] }
  return companies.map((company) => <CompanyCard key={company.id} company={company} />)
}
export default Companies
