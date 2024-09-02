import icon from '@/assets/icons/list-company.svg'
import NameCard from '@/components/NameCard'
import SearchInput from '@/components/SearchInput'
import { requireAuth } from '@shared/actions/auth.actions'
import { CompanyInfo } from '@shared/models'
import { useEffect, useState } from 'react'
import { defer, Link, useLoaderData } from 'react-router-dom'

export async function companiesLoader() {
  await requireAuth()
  return defer({ companies: await window.context.getCompanies() })
}

const Companies = () => {
  const { companies } = useLoaderData() as { companies: CompanyInfo[] }
  const [search, setSearch] = useState('')
  const [filteredCompanies, setFilteredCompanies] = useState(companies)

  useEffect(() => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredCompanies(filtered)
  }, [search, companies])

  return (
    <div className="gap-4">
      <div className="flex items-center p-2 gap-4">
        {/* <BsThreeDotsVertical className="cursor-pointer" /> */}
        <h1 className="text-3xl font-bold ml-8">الشركات</h1>
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="name-list">
        {filteredCompanies.map((company) => (
          <Link to={company.id!} key={company.id}>
            <NameCard name={company.name} icon={icon} />
          </Link>
        ))}
      </div>
    </div>
  )
}
export default Companies
