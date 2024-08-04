import CustomDropDownMenu from '@/components/CustomDropDownMenu'
import { requireAuth } from '@shared/auth.actions'
import { CustomerInfo } from '@shared/models'
import { DropDownOption } from '@shared/types'
import { FaRegEdit } from 'react-icons/fa'
import { GrView } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'

import { cardsColumns } from '@/components/columns/cards-columns'
import { DataTable } from '@/components/ui/data-table'
import { BsTrash } from 'react-icons/bs'
import { defer, useLoaderData } from 'react-router-dom'
import { mockCards } from '../../../../shared/mocks/dummy'

export async function customerDetailsLoader({ params }) {
  console.log(params)
  await requireAuth()
  return defer({
    customer: {
      id: '2024',
      name: 'أحمد مسعد جمال',
      national_id: '29423242925',
      grand_name: 'Khaled',
      address: 'Dok'
    }
  })
}

const options: DropDownOption[] = [
  { name: 'تعديل', icon: <FaRegEdit size={20} /> },
  { name: 'عرض الفواتير', icon: <GrView size={20} /> },
  { name: 'عمل فاتورة', icon: <IoMdAdd size={20} /> },
  { name: 'حذف', className: 'text-red-500', icon: <BsTrash size={20} /> }
]

const CustomerDetails = () => {
  const { customer } = useLoaderData() as { customer: CustomerInfo }
  return (
    <div className="px-4 py-6 h-full gap-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl">{customer.name}</h1>
          <h2 className="text-lg text-subtitle">الرقم القومي: {customer.national_id}</h2>
        </div>
        <CustomDropDownMenu options={options} />
      </div>
      <div>
        <hr className="my-4 border-gray-300" />
        <div className="flex flex-col gap-4">
          <h2 className="text-xl">الأسم الكامل: {customer.name}</h2>
          <h2 className="text-xl">اسم الجد: {customer.grand_name}</h2>
          <h2 className="text-xl">العنوان: {customer.address}</h2>
        </div>
      </div>
      <div className="mt-2">
        <hr className="my-4 border-gray-300" />
        <DataTable data={mockCards} columns={cardsColumns} />
      </div>
    </div>
  )
}
export default CustomerDetails
