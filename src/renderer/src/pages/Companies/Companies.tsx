import NameCard from '@/components/NameCard'
import { requireAuth } from '@shared/auth.actions'
import { Company } from '@shared/models'
import { defer, Link, useLoaderData } from 'react-router-dom'
import { mockCompanies } from '../../mocks/dummy'

export async function companiesLoader() {
  await requireAuth()
  return defer({ companies: mockCompanies })
}

const Companies = () => {
  const { companies } = useLoaderData() as { companies: Company[] }
  return (
    <div className="gap-4">
      <div className="flex items-center p-2">
        {/* <BsThreeDotsVertical className="cursor-pointer" /> */}
        <h1 className="text-3xl font-bold">الشركات</h1>
      </div>
      <div>
        <div className="name-list">
          {companies.map((company) => (
            <Link to={company.id} key={company.id}>
              <NameCard name={company.name} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Companies
