import { DataTableColumnHeader } from '@components/columns'

export const card_columns = [
  {
    accessorKey: 'number',
    header: ({ column }) => <DataTableColumnHeader column={column} title="الرقم" sort={false} />
  },
  {
    accessorKey: 'price_after_vat',
    header: ({ column }) => <DataTableColumnHeader column={column} title="السعر" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price_after_vat'))
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EGP'
      }).format(amount)
    }
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="تاريخ التشغيل" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue('start_date'))
      return date.toLocaleDateString()
    }
  },
  {
    accessorKey: 'company.name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="الشركة" />
  },
  {
    accessorKey: 'customer.fullname',
    header: ({ column }) => <DataTableColumnHeader column={column} title="العميل" />
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="الملاحظات" sort={false} />
    ),
    cell: ({ row }) => row.original.comment ?? 'لا يوجد'
  }
]
