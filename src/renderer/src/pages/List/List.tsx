import SearchInput from '@/components/SearchInput'
import { mockListData } from '@shared/mocks/dummy'
import { ListData } from '@shared/models'
import { useEffect, useState } from 'react'
import { defer, useLoaderData } from 'react-router-dom'
import MonthTable from './components/MonthTable'

export async function listLoader() {
  return defer({ data: mockListData })
}

const List = () => {
  const { data } = useLoaderData() as { data: ListData[] }
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    const filtered = data
      .map((monthData) => ({
        ...monthData,
        info: monthData.info.filter((info) =>
          info.name.toLowerCase().includes(search.toLowerCase())
        )
      }))
      .filter((monthData) => monthData.info.length > 0)

    setFilteredData(filtered)
  }, [search, data])

  return (
    <div className="p-2">
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="mt-4">
        {filteredData.map((monthData) => (
          <MonthTable key={monthData.month} data={monthData} />
        ))}
      </div>
    </div>
  )
}
export default List
