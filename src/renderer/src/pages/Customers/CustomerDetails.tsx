import CustomDropDownMenu from '@/components/CustomDropDownMenu'
import { CardInfo, CustomerInfo, InvoiceData } from '@shared/models'
import { DropDownOption } from '@shared/types'
import { FaRegEdit } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'

import { customerCardColumns } from '@/components/columns/customer-cards-columns'
import AddCardToCustomerDialog from '@/components/dialogs/AddCardToCustomerDialog'
import DeleteDialog from '@/components/dialogs/DeleteDialog'
import { DataTable } from '@/components/ui/data-table'
import { routes } from '@shared/constants'
import { defer, useLoaderData, useNavigate } from 'react-router-dom'
import { getCardsFromCustomerId, getUnOccupiedCards } from '../../repositories/card.repository'
import { deleteCustomer, getCustomer } from '../../repositories/customer.repository'
import { getInvoicesByCustomerId } from '../../repositories/invoices.repository'
import CustomerInvoice from './components/CustomerInvoice'

export async function customerDetailsLoader({ params }) {
  const customer = await getCustomer(params.id)
  const cards = await getCardsFromCustomerId(params.id)
  const invoices = await getInvoicesByCustomerId(params.id)

  const unOccupiedCards = await getUnOccupiedCards()
  return defer({
    customer: customer,
    cards: cards,
    unOccupiedCards: unOccupiedCards,
    invoices: invoices
  })
}

const CustomerDetails = () => {
  const navigate = useNavigate()
  const { customer, cards, unOccupiedCards, invoices } = useLoaderData() as {
    customer: CustomerInfo
    cards: CardInfo[]
    unOccupiedCards: CardInfo[]
    invoices: InvoiceData[]
  }

  const updatePage = () => {
    window.location.reload()
  }

  const getTotal = () => {
    if (customer.cards && customer.cards.length > 0) {
      return customer.cards?.map((card) => card.price_after_vat).reduce((a, b) => a + b)
    }
    return 0
  }

  const deleteCustomerF = async () => {
    await deleteCustomer(customer.id!)
    navigate(`/${routes.customers}`)
  }

  const options: DropDownOption[] = [
    {
      name: 'اضافة خط',
      render: (
        <AddCardToCustomerDialog
          key="اضافة خط"
          customer={customer}
          title="اضافة خط"
          cards={unOccupiedCards}
          updatePage={updatePage}
        />
      )
    },
    {
      name: 'عمل فاتورة',
      icon: <IoMdAdd size={20} />,
      onClick: () => navigate(`/customer/${customer.id}/invoice`)
    },
    {
      name: 'تعديل',
      icon: <FaRegEdit size={20} />,
      onClick: () => navigate(`/edit/${customer.id}/customer`)
    },
    {
      name: 'حذف',
      className: 'text-red-500',
      render: (
        <DeleteDialog
          key="حذف"
          placeholder="حذف"
          title="حذف العميل"
          description="هل انت متأكد من حذف العميل؟"
          onConfirm={deleteCustomerF}
        />
      )
    }
  ]
  return (
    <div className="px-4 py-6 h-full gap-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl">{customer.name}</h1>
          <h2 className="text-lg text-subtitle">
            الرقم القومي: {customer.national_id ?? 'لا يوجد'}
          </h2>
        </div>
        <CustomDropDownMenu options={options} />
      </div>
      <div>
        <hr className="my-4 border-gray-300" />
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl">الاسم الكامل: {customer.name ?? 'لا يوجد'}</h2>
            <h2 className="text-xl">اسم الجد: {customer.grand_name ?? 'لا يوجد'}</h2>
            <h2 className="text-xl">العنوان: {customer.address ?? 'لا يوجد'}</h2>
          </div>
          {invoices.length > 0 ? (
            <CustomerInvoice key={invoices[0].name} invoices={invoices[0]} total={getTotal()} />
          ) : null}
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
