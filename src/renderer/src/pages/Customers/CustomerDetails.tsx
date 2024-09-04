import CustomDropDownMenu from '@/components/CustomDropDownMenu'
import { CardInfo, CustomerInfo } from '@shared/models'
import { DropDownOption } from '@shared/types'
import { FaRegEdit } from 'react-icons/fa'
import { GrView } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'

import { customerCardColumns } from '@/components/columns/customer-cards-columns'
import AddCardToCustomerDialog from '@/components/dialogs/AddCardToCustomerDialog'
import DeleteDialog from '@/components/dialogs/DeleteDialog'
import { DataTable } from '@/components/ui/data-table'
import { routes } from '@shared/constants'
import { defer, useLoaderData, useNavigate } from 'react-router-dom'

export async function customerDetailsLoader({ params }) {
  const customer = await window.context.getCustomer(params.id)
  const cards = await window.context.getCardsFromCustomerId(params.id)

  const unOccupiedCards = await window.context.getUnOccupiedCards()
  return defer({
    customer: customer,
    cards: cards,
    unOccupiedCards: unOccupiedCards
  })
}

const CustomerDetails = () => {
  const navigate = useNavigate()
  const { customer, cards, unOccupiedCards } = useLoaderData() as {
    customer: CustomerInfo
    cards: CardInfo[]
    unOccupiedCards: CardInfo[]
  }

  const updatePage = () => {
    window.location.reload()
  }

  const deleteCustomer = async () => {
    await window.context.deleteCustomer(customer.id!)
    navigate(`/${routes.customers}`)
  }

  const options: DropDownOption[] = [
    {
      name: 'اضافة خط',
      render: (
        <AddCardToCustomerDialog
          customer={customer}
          title="اضافة خط"
          cards={unOccupiedCards}
          updatePage={updatePage}
        />
      )
    },
    {
      name: 'تعديل',
      icon: <FaRegEdit size={20} />,
      onClick: () => navigate(`/edit/${customer.id}/customer`)
    },
    {
      name: 'عرض الفواتير',
      icon: <GrView size={20} />
    },
    {
      name: 'عمل فاتورة',
      icon: <IoMdAdd size={20} />,
      onClick: () => navigate(`/customer/${customer.id}/invoice`)
    },
    {
      name: 'حذف',
      className: 'text-red-500',
      render: (
        <DeleteDialog
          placeholder="حذف"
          title="حذف العميل"
          description="هل انت متأكد من حذف العميل؟"
          onConfirm={deleteCustomer}
        />
      )
    }
  ]
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
          <h2 className="text-xl">الاسم الكامل: {customer.name}</h2>
          <h2 className="text-xl">اسم الجد: {customer.grand_name}</h2>
          <h2 className="text-xl">العنوان: {customer.address}</h2>
        </div>
      </div>
      <div className="mt-2">
        <hr className="my-4 border-gray-300" />
        <DataTable data={cards} columns={customerCardColumns} />
      </div>
    </div>
  )
}
export default CustomerDetails
