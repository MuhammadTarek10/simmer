import { CustomerInfo } from '@shared/models'

const InvoiceFormCustomer = ({ customer, total }: { customer: CustomerInfo; total: number }) => {
  const getHowMuchShouldPay = () => {
    return customer.cards?.reduce((acc, card) => acc + card.price_after_vat, 0)
  }

  return (
    <div className="bg-white shadow-md rounded-md p-4 ml-[20vw] h-fit space-y-4 px-12">
      <div className="flex gap-4 justify-between">
        <h1 className="text-xl">عدد الخطوط</h1>
        <h1 className="text-xl font-bold">{customer.cards?.length}</h1>
      </div>
      <div className="flex gap-4 justify-between">
        <h1 className="text-xl">المستحق شهريا</h1>
        <h1 className="text-xl font-bold">{getHowMuchShouldPay()}</h1>
      </div>
      <div className="flex gap-4 justify-between">
        <h1 className="text-xl">اجمالي المبلغ المطلوب</h1>
        <h1 className="text-xl font-bold">{total}</h1>
      </div>
    </div>
  )
}
export default InvoiceFormCustomer
