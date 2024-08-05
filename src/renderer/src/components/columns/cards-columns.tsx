import SortableButton from '@/components/SortableButton'
import { routes } from '@shared/constants'
import { CardInfo } from '@shared/models'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'

export const cardsColumns: ColumnDef<CardInfo>[] = [
  {
    accessorKey: 'card_number',
    header: 'الخط'
  },
  {
    accessorKey: 'company.name',
    header: 'الشركة'
  },
  {
    accessorKey: 'offer.name',
    header: 'العرض',
    cell: ({ row }) => <div>{row.original.offer?.name || 'لا يوجد عرض'}</div>
  },
  {
    accessorKey: 'offer_end_date',
    header: ({ column }) => <SortableButton title="تاريخ الانتهاء" column={column} />,
    cell: ({ row }) => {
      const offerEndDate = row.original.offer_end_date
      return offerEndDate ? (
        <span>{offerEndDate}</span>
      ) : (
        <span className="text-gray-400">لا يوجد تاريخ انتهاء</span>
      )
    }
  },
  {
    accessorKey: 'price_after_vat',
    header: ({ column }) => <SortableButton title="السعر" column={column} />
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
    cell: ({ row }) => {
      const card = row.original

      return (
        <Link to={`/${routes.cards}/${card.id}`} className="text-blue-500">
          عرض
        </Link>
      )
    }
  }
]
