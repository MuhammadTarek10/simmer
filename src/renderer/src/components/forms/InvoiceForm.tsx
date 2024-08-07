import { zodResolver } from '@hookform/resolvers/zod'
import { convertDateToString } from '@shared/converters'
import { CustomerInfo, InvoiceInfo } from '@shared/models'
import { InvoiceValidationSchema } from '@shared/validation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddingHeader from '../AddingHeader'
import DisabledInput from '../DisabledInput'
import SubmitButton from '../SubmitButton'
import { Form } from '../ui/form'
import { useToast } from '../ui/use-toast'
import CustomFormField, { FormFieldType } from './CustomFormField'

const InvoiceForm = ({
  customer,
  onClick
}: {
  customer: CustomerInfo
  onClick: (invoice: InvoiceInfo) => void
}) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof InvoiceValidationSchema>>({
    resolver: zodResolver(InvoiceValidationSchema)
  })

  useEffect(() => {
    form.setValue('customer_name', customer.name)
  }, [])

  const onSubmit = async (data: z.infer<typeof InvoiceValidationSchema>) => {
    onClick({
      customer: customer,
      invoice_date: convertDateToString(data.invoice_date),
      amount: data.amount
    })
  }

  return (
    <div className="h-full">
      <AddingHeader title={'فاتورة'} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
          <div className="w-[50vh] space-y-2">
            <DisabledInput label="اسم العميل" value={customer.name} />
            <CustomFormField
              control={form.control}
              name="invoice_date"
              label="تاريخ الفاتورة"
              fieldType={FormFieldType.DATE_PICKER}
            />
            <CustomFormField
              control={form.control}
              name="amount"
              label="المبلغ"
              fieldType={FormFieldType.INPUT}
            />
            <CustomFormField
              control={form.control}
              name="comment"
              label="ملاحظات"
              fieldType={FormFieldType.TEXTAREA}
              height="h-[40vh]"
            />
            <div className="flex w-full justify-end p-2">
              <SubmitButton
                className="absolute bottom-12 left-12 flex bg-save text-2xl py-2 px-12 rounded-full"
                isLoading={isLoading}
              >
                حفظ
              </SubmitButton>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default InvoiceForm
