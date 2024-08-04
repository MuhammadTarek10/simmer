import { zodResolver } from '@hookform/resolvers/zod'
import { convertStringToDate } from '@shared/converters'
import { CompanyInfo } from '@shared/models'
import { CompanyValidationSchema } from '@shared/validation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddingHeader from '../AddingHeader'
import SubmitButton from '../SubmitButton'
import { Form } from '../ui/form'
import CustomFormField, { FormFieldType } from './CustomFormField'

const CompanyForm = ({ company }: { company?: CompanyInfo }) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof CompanyValidationSchema>>({
    resolver: zodResolver(CompanyValidationSchema),
    defaultValues: {
      ...company,
      invoice_date: convertStringToDate(company?.invoice_date)
    }
  })

  const onSubmit = async (data: z.infer<typeof CompanyValidationSchema>) => {
    console.log(data)
  }

  return (
    <div className="h-full">
      <AddingHeader title="اضافة شركة" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
          <div className="w-[50vh] space-y-2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              label="اسم الشركة"
              control={form.control}
              name="name"
            />
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              label="تاريخ السداد"
              control={form.control}
              name="invoice_date"
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              label="ملاحظات"
              control={form.control}
              name="comment"
              height="h-[50vh]"
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
export default CompanyForm
