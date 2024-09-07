import icon from '@/assets/icons/list-company.svg'
import NameCard from '@/components/NameCard'
import SearchInput from '@/components/SearchInput'
import { getCompanies } from '../../repositories/company.repository'
import { CompanyInfo } from '@shared/models'
import { useEffect, useState } from 'react'
import { defer, Link, useLoaderData } from 'react-router-dom'

export async function companiesLoader() {
  return defer({ companies: await getCompanies() })
}

const Companies = () => {
  const { companies } = useLoaderData() as { companies: CompanyInfo[] }
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState(companies)

  useEffect(() => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredData(filtered)
  }, [search, companies])

  return (
    <div className="p-2">
      <div className="gap-4">
        <div className="flex items-center p-2 gap-4">
          {/* <BsThreeDotsVertical className="cursor-pointer" /> */}
          <h1 className="text-3xl font-bold">الشركات</h1>
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="name-list">
          {filteredData.map((company) => (
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
