import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerInfo } from '@shared/models'
import { CustomerValidationSchema } from '@shared/validation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddingHeader from '../AddingHeader'
import SubmitButton from '../SubmitButton'
import { Form } from '../ui/form'
import CustomFormField, { FormFieldType } from './CustomFormField'

const CustomerForm = ({ customer }: { customer?: CustomerInfo }) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof CustomerValidationSchema>>({
    resolver: zodResolver(CustomerValidationSchema),
    defaultValues: {
      ...customer
    }
  })

  const onSubmit = async (data: z.infer<typeof CustomerValidationSchema>) => {
    setIsLoading(true)
    try {
      await window.context.addCustomer({
        ...data
      })
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full">
      <AddingHeader title="اضافة عميل" />
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
              className="absolute bottom-12 left-12 flex bg-save text-2xl py-2 px-12 rounded-full"
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
