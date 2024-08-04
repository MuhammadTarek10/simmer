import { zodResolver } from '@hookform/resolvers/zod'
import { OfferInfo } from '@shared/models'
import { OfferValidationSchema } from '@shared/validation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddingHeader from '../AddingHeader'
import SubmitButton from '../SubmitButton'
import { Form } from '../ui/form'
import CustomFormField, { FormFieldType } from './CustomFormField'

const OfferForm = ({ offer }: { offer?: OfferInfo }) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof OfferValidationSchema>>({
    resolver: zodResolver(OfferValidationSchema),
    defaultValues: {
      ...offer
    }
  })

  const onSubmit = async (data: z.infer<typeof OfferValidationSchema>) => {
    console.log(data)
  }

  return (
    <div className="h-full">
      <AddingHeader title="اضافة عرض" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
          <div className="w-[50vh] space-y-2">
            <CustomFormField
              label="اسم العرض"
              name="name"
              fieldType={FormFieldType.INPUT}
              control={form.control}
            />

            <CustomFormField
              label="المدة بالشهور"
              name="period_in_month"
              fieldType={FormFieldType.INPUT}
              control={form.control}
            />

            <CustomFormField
              label="نسبة الخصم"
              name="percentage"
              fieldType={FormFieldType.INPUT}
              control={form.control}
            />

            <CustomFormField
              label="ملاحظات"
              name="comment"
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              height="h-[40vh]"
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
export default OfferForm
