import { listColumns } from '@/components/columns/list-columns'
import { DataTable } from '@/components/ui/data-table'
import { ListInfo } from '@shared/models'

const MonthTable = ({ data }: { data: ListInfo[] }) => {
  return (
    <div className="flex flex-col gap-4 p-2 m-2">
      <DataTable data={data} columns={listColumns} />
      <hr className="my-4 border-gray-300" />
    </div>
  )
}
export default MonthTable
