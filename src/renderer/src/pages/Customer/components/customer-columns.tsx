import { DataTableColumnHeader } from '@components/column-header'

export const customer_columns = [
  {
    accessorKey: 'fullname',
    header: ({ column }) => <DataTableColumnHeader column={column} title="الاسم" />
  },
  {
    accessorKey: 'national_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="الرقم القومي" />
  },
  {
    accessorKey: 'grand_name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="اسم الجد" sort={false} />,
    cell: ({ row }) => row.getValue('grand_name') || '-'
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
  }
]
