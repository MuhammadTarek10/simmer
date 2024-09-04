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
  invoice,
  customer,
  total
}: {
  invoice?: InvoiceInfo
  customer: CustomerInfo
  total: number
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [remaining, setRemaining] = useState(total)
  const form = useForm<z.infer<typeof InvoiceValidationSchema>>({
    resolver: zodResolver(InvoiceValidationSchema)
  })

  useEffect(() => {
    const amount = form.watch('amount')
    setRemaining(total + Number(amount))
  }, [form.watch('amount')])

  useEffect(() => {
    form.setValue('customer_name', customer.name)

    if (invoice) {
      form.setValue('invoice_date', new Date(invoice.invoice_date))
      form.setValue('amount', invoice.amount)
      form.setValue('comment', invoice.comment)
    }
  }, [])

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

  const onSubmit = async (data: z.infer<typeof InvoiceValidationSchema>) => {
    addInvoice({
      customer: customer,
      invoice_date: convertDateToString(data.invoice_date),
      amount: data.amount,
      comment: data.comment
    })
  }

  return (
    <div className="h-full">
      <AddingHeader title={'فاتورة'} />
      <div className="flex">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
            <div className="w-[70vh] space-y-2">
              <div className="form-row">
                <DisabledInput label="اسم العميل" value={customer.name} />
                <DisabledInput
                  label="عدد الخطوط"
                  value={customer.cards?.length.toString() || '0'}
                />
              </div>
              <div className="form-row">
                <CustomFormField
                  control={form.control}
                  name="invoice_date"
                  label="تاريخ الفاتورة"
                  fieldType={FormFieldType.DATE_PICKER}
                />
                <DisabledInput
                  label="المستحق شهريا"
                  value={
                    customer.cards
                      ?.reduce((acc, card) => acc + card.price_after_vat, 0)
                      .toString() || '0'
                  }
                />
              </div>
              <DisabledInput
                label="اجمالي المبلغ المطلوب"
                value={total < 0 ? total.toString() : '0'}
              />
              <div className="form-row">
                <CustomFormField
                  control={form.control}
                  name="amount"
                  label="الدفع"
                  fieldType={FormFieldType.INPUT}
                />
                <DisabledInput label="المتبقي" value={remaining < 0 ? remaining.toString() : '0'} />
              </div>
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
    </div>
  )
}
export default InvoiceForm
