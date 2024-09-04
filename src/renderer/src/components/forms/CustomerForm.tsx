import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerInfo } from '@shared/models'
import { CustomerValidationSchema } from '@shared/validation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddingHeader from '../AddingHeader'
import SubmitButton from '../SubmitButton'
import { Form } from '../ui/form'
import { useToast } from '../ui/use-toast'
import CustomFormField, { FormFieldType } from './CustomFormField'

const CustomerForm = ({ customer }: { customer?: CustomerInfo }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof CustomerValidationSchema>>({
    resolver: zodResolver(CustomerValidationSchema)
  })

  useEffect(() => {
    if (customer) {
      form.setValue('name', customer.name)
      form.setValue('national_id', customer.national_id)
      form.setValue('grand_name', customer.grand_name)
      form.setValue('address', customer.address)
      form.setValue('comment', customer.comment)
    }
  }, [])

  const onSubmit = async (data: z.infer<typeof CustomerValidationSchema>) => {
    setIsLoading(true)
    try {
      if (customer) {
        await window.context.updateCustomer({
          ...data,
          id: customer.id
        })
        toast({
          title: 'تم التعديل بنجاح',
          description: 'تم تعديل العميل بنجاح'
        })
      } else {
        await window.context.addCustomer({
          ...data
        })
        toast({
          title: 'تمت الاضافة بنجاح',
          description: 'تمت اضافة العميل بنجاح'
        })
      }
      form.reset()
    } catch (e) {
      console.log(e)
      toast({
        title: 'حدث خطأ',
        description: 'حدث خطأ اثناء اضافة العميل',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full">
      <AddingHeader title={customer ? 'تعديل عميل' : 'اضافة عميل'} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
          <div className="w-[70vh] space-y-8">
            <div className="form-row">
              <CustomFormField
                label="اسم العميل"
                name="name"
                fieldType={FormFieldType.INPUT}
                control={form.control}
              />

              <CustomFormField
                label="الرقم القومي"
                name="national_id"
                fieldType={FormFieldType.INPUT}
                control={form.control}
              />
            </div>

            <div className="form-row">
              <CustomFormField
                label="اسم الجد"
                name="grand_name"
                fieldType={FormFieldType.INPUT}
                control={form.control}
              />

              <CustomFormField
                label="العنوان"
                name="address"
                fieldType={FormFieldType.INPUT}
                control={form.control}
              />
            </div>

            <CustomFormField
              label="ملاحظات"
              name="comment"
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              height="h-[45vh]"
            />
          </div>
          <div className="flex w-full justify-end p-2">
            <SubmitButton
              className="absolute bottom-24 left-24 flex bg-save text-4xl py-6 px-16 rounded-full"
              isLoading={isLoading}
            >
              حفظ
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default CustomerForm
