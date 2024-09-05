import { routes } from '@shared/constants'
import { ListInfo } from '@shared/models'
import { ColumnDef } from '@tanstack/react-table'
import TableActionButton from '../TableActionButton'

export const listColumns: ColumnDef<ListInfo>[] = [
  {
    accessorKey: 'name',
    header: 'الاسم'
  },
  {
    accessorKey: 'number_of_cards',
    header: 'عدد الخطوط'
  },
  {
    accessorKey: 'total',
    header: 'الفاتورة الشهرية'
  },
  {
    accessorKey: 'paid',
    header: 'المدفوع'
  },
  {
    accessorKey: 'remaining',
    header: 'المتبقي'
  },
  {
    accessorKey: 'comment',
    header: 'ملاحظات',
    cell: ({ row }) => {
      const comment = row.original.comment
      return comment ? (
        <span>{comment}</span>
      ) : (
        <span className="text-gray-400">لا توجد ملاحظات</span>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <TableActionButton title="عرض" href={`/${routes.customers}/${row.original.customer_id}`} />
    )
  }
]
