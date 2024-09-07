import { zodResolver } from '@hookform/resolvers/zod'
import { convertDateToString, convertStringToDate } from '@shared/converters'
import { CompanyInfo } from '@shared/models'
import { CompanyValidationSchema } from '@shared/validation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addCompany, updateCompany } from '../../repositories/company.repository'
import AddingHeader from '../AddingHeader'
import SubmitButton from '../SubmitButton'
import { Form } from '../ui/form'
import { useToast } from '../ui/use-toast'
import CustomFormField, { FormFieldType } from './CustomFormField'

const CompanyForm = ({ company }: { company?: CompanyInfo }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof CompanyValidationSchema>>({
    resolver: zodResolver(CompanyValidationSchema)
  })

  useEffect(() => {
    if (company) {
      form.setValue('name', company.name)
      form.setValue('invoice_date', convertStringToDate(company.invoice_date))
      form.setValue('comment', company.comment)
    }
  }, [])

  const onSubmit = async (data: z.infer<typeof CompanyValidationSchema>) => {
    setIsLoading(true)
    try {
      if (company) {
        await updateCompany({
          ...data,
          invoice_date: convertDateToString(data.invoice_date),
          id: company.id
        })
        toast({
          title: 'تم التعديل بنجاح',
          description: 'تم تعديل الشركة بنجاح'
        })
      } else {
        await addCompany({
          ...data,
          invoice_date: convertDateToString(data.invoice_date)
        })
        toast({
          title: 'تمت الاضافة بنجاح',
          description: 'تمت اضافة الشركة بنجاح'
        })
      }
      form.reset()
    } catch (e) {
      console.log(e)
      toast({
        title: 'حدث خطأ',
        description: 'حدث خطأ اثناء اضافة الشركة',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full">
      <AddingHeader title={company ? 'تعديل شركة' : 'اضافة شركة'} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
          <div className="w-[70vh] space-y-2">
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
export default CompanyForm
