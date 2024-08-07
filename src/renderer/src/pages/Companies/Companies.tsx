import icon from '@/assets/icons/list-company.svg'
import NameCard from '@/components/NameCard'
import { requireAuth } from '@shared/actions/auth.actions'
import { CompanyInfo } from '@shared/models'
import { defer, Link, useLoaderData } from 'react-router-dom'

export async function companiesLoader() {
  await requireAuth()
  const companies = await window.context.getCompanies()
  return defer({ companies: companies })
}

const Companies = () => {
  const { companies } = useLoaderData() as { companies: CompanyInfo[] }
  return (
    <div className="gap-4">
      <div className="flex items-center p-2">
        {/* <BsThreeDotsVertical className="cursor-pointer" /> */}
        <h1 className="text-3xl font-bold">الشركات</h1>
      </div>
      <div>
        <div className="name-list">
          {companies.map((company) => (
            <Link to={company.id!} key={company.id}>
              <NameCard name={company.name} icon={icon} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Companies
