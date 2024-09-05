import CustomSelect from '@/components/CustomSelect'
import SearchInput from '@/components/SearchInput'
import { ListInfo } from '@shared/models'
import { useEffect, useState } from 'react'
import { defer, useLoaderData } from 'react-router-dom'
import { updatePaymentInvoices } from '../../repositories/invoices'
import MonthTable from './components/MonthTable'

export async function homeLoader() {
  const list = await window.context.getList()
  await updatePaymentInvoices()
  return defer({ data: list })
}

const Home = () => {
  const { data } = useLoaderData() as { data: ListInfo[] }
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    const filtered = data.filter((info) => info.name.toLowerCase().includes(search))

    setFilteredData(filtered)
  }, [search, data])

  const onChangeValue = async (value: string) => {
    const list = await window.context.getList(value === 'الكل')
    setFilteredData(list)
  }

  return (
    <div className="p-2">
      <div className="flex items-center">
        <h1 className="flex text-3xl font-bold ml-8">الرئيسية</h1>
        <SearchInput
          placeholder="ابحث بالاسم"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <CustomSelect
          placeholder="المتأخرين"
          options={[{ name: 'الكل' }]}
          onChange={onChangeValue}
          addPlaceholder={true}
        />
      </div>
      <div className="mt-4">
        <MonthTable data={filteredData} />
      </div>
    </div>
  )
}
export default Home
