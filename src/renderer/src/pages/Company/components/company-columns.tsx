import { ColumnAction } from '@components/column-action'
import { DataTableColumnHeader } from '@components/column-header'

export const company_columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="الاسم" />
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="رقم الهاتف" sort={false} />
    )
  },
  {
    accessorKey: 'invoice_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="تاريخ التحصيل" sort={false} />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('invoice_date'))
      return date.toLocaleDateString()
    }
  },
  {
    accessorKey: 'cards',
    header: ({ column }) => <DataTableColumnHeader column={column} title="عدد الخطوط" />,
    cell: ({ row }) => {
      const cards = row.original.cards
      return cards.length > 0 ? cards.length : 0
    }
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ملاحظات" sort={false} />,
    cell: ({ row }) => row.original.comment ?? 'لا يوجد'
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ColumnAction
        element={row.original}
        actions={[
          {
            callback: (company) => console.log('edit', company),
            label: 'تعديل'
          },
          {
            callback: () => console.log('delete'),
            label: 'حذف'
          }
        ]}
      />
    )
  }
]
