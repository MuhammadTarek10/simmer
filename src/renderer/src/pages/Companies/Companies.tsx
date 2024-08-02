import NameCard from '@/components/NameCard'
import { requireAuth } from '@shared/auth.actions'
import { Company } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'
import { mockCompanies } from '../../mocks/dummy'

export async function companiesLoader() {
  await requireAuth()
  return defer({ companies: mockCompanies })
}

const Companies = () => {
  const { companies } = useLoaderData() as { companies: Company[] }
  return (
    <div className="gap-4">
      <div className="flex items-center justify-end p-2">
        {/* <BsThreeDotsVertical className="cursor-pointer" /> */}
        <h1 className="text-3xl font-bold">الشركات</h1>
      </div>
      <div>
        <div className="name-list">
          {companies.map((company) => (
            <NameCard key={company.id} name={company.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Companies
