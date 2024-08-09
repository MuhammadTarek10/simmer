import CustomSelect from '@/components/CustomSelect'
import SearchInput from '@/components/SearchInput'
import { requireAuth } from '@shared/actions/auth.actions'
import { ListData } from '@shared/models'
import { useEffect, useState } from 'react'
import { defer, useLoaderData } from 'react-router-dom'
import MonthTable from './components/MonthTable'

export async function listLoader() {
  await requireAuth()
  const list = await window.context.getList()
  return defer({ data: list, years: ['2024', '2023', '2022'] })
}

const List = () => {
  const { data, years } = useLoaderData() as { data: ListData[]; years: string[] }
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

  const onChangeYear = async (year: string) => {
    const list = await window.context.getList(parseInt(year))
    setFilteredData(list)
  }

  return (
    <div className="p-2">
      <div className="flex items-center">
        <h1 className="flex text-3xl font-bold ml-8">البيانات</h1>
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
        <CustomSelect
          placeholder="الكل"
          options={years.map((year) => ({ name: year }))}
          onChange={onChangeYear}
          addPlaceholder={true}
        />
      </div>
      <div className="mt-4">
        {filteredData.map((monthData) => (
          <MonthTable key={monthData.month} data={monthData} />
        ))}
      </div>
    </div>
  )
}
export default List
