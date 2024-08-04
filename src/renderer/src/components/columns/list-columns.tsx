import { ListInfo } from '@shared/models'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'

export const listColumns: ColumnDef<ListInfo>[] = [
  {
    accessorKey: 'name',
    header: 'الاسم'
  },
  {
    accessorKey: 'card_number',
    header: 'الخط'
  },
  {
    accessorKey: 'company_name',
    header: 'الشركة'
  },
  {
    accessorKey: 'offer_name',
    header: 'العرض'
  },
  {
    accessorKey: 'invoice_date',
    header: 'تاريخ آخر دفع'
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
    header: 'ملاحظات'
  },
  {
    id: 'actions',
    cell: ({ row }) => <Link to={`/customers/${row.original.customer_id}`}>عرض</Link>
  }
]
