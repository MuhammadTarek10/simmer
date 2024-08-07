import InvoiceForm from '@/components/forms/InvoiceForm'
import { useToast } from '@/components/ui/use-toast'
import { CustomerInfo, InvoiceInfo } from '@shared/models'
import { defer, useLoaderData } from 'react-router-dom'

export async function addCustomerInvoiceLoader({ params }) {
  const { id } = params
  const customer = await window.context.getCustomer(id)

  return defer({ customer: customer })
}

const AddCustomerInvoice = () => {
  const { customer } = useLoaderData() as { customer: CustomerInfo }
  const { toast } = useToast()
  const addInvoice = async (invoice: InvoiceInfo) => {
    try {
      await window.context.addInvoice(invoice)
      toast({
        title: 'تمت اضافة الفاتورة بنجاح',
        description: 'تمت اضافة الفاتورة بنجاح'
      })
    } catch (e) {
      console.log(e)
      toast({
        title: 'حدث خطأ',
        description: 'حدث خطأ اثناء اضافة الفاتورة'
      })
    }
  }

  return (
    <div className="flex flex-col m-4">
      <InvoiceForm customer={customer} onClick={addInvoice} />
    </div>
  )
}
export default AddCustomerInvoice
