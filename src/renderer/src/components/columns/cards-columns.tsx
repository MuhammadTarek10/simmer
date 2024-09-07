import SortableButton from '@/components/SortableButton'
import { CardInfo } from '@shared/models'
import { ColumnDef } from '@tanstack/react-table'
import { deleteCard } from '../../repositories/card.repository'
import TableActionButton from '../TableActionButton'
import DeleteDialog from '../dialogs/DeleteDialog'

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
        <div className="flex w-fit">
          {/* <TableActionButton
            title="عرض"
            href={`/${routes.cards}/${card.id}`}
            className="hover:bg-action/25 p-2 rounded-lg"
          /> */}
          <TableActionButton
            title="تعديل"
            href={`/edit/${card.id}/card`}
            className="hover:bg-action/25 p-2 rounded-lg"
          />
          <DeleteDialog
            placeholder="حذف"
            title="حذف الخط"
            description="هل انت متأكد من حذف الخط؟"
            onConfirm={async () => {
              await deleteCard(row.original.id!)
              window.location.reload()
            }}
            showIcon={false}
          />
        </div>
      )
    }
  }
]
