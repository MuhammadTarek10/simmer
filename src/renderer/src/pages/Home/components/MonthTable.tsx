import { listColumns } from '@/components/columns/list-columns'
import { DataTable } from '@/components/ui/data-table'
import { convertMonthToArabic } from '@/utils/utils'
import { ListData } from '@shared/models'

const MonthTable = ({ data }: { data: ListData }) => {
  return (
    <div className="flex flex-col gap-4 p-2 m-2">
      <h1 className="text-2xl font-bold">{convertMonthToArabic(data.month)}</h1>
      <DataTable data={data.info} columns={listColumns} />
      <hr className="my-4 border-gray-300" />
    </div>
  )
}
export default MonthTable
