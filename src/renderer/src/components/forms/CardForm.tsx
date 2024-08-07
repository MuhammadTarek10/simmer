import { zodResolver } from '@hookform/resolvers/zod'
import { convertDateToString, convertStringToDate } from '@shared/converters'
import { CardInfo, CompanyInfo, OfferInfo } from '@shared/models'
import { CardValidationSchema } from '@shared/validation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddingHeader from '../AddingHeader'
import DisabledInput from '../DisabledInput'
import SubmitButton from '../SubmitButton'
import { Form } from '../ui/form'
import { useToast } from '../ui/use-toast'
import CustomFormField, { FormFieldType } from './CustomFormField'

const CardForm = ({ card }: { card?: CardInfo }) => {
  const { toast } = useToast()
  const [companies, setCompanies] = useState<CompanyInfo[]>([])
  const [offers, setOffers] = useState<OfferInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [profit, setProfit] = useState(0)
  const form = useForm<z.infer<typeof CardValidationSchema>>({
    resolver: zodResolver(CardValidationSchema)
  })

  useEffect(() => {
    const calculateProfit = () => {
      const priceBeforeVat = form.watch('price_before_vat')
      const priceAfterVat = form.watch('price_after_vat')
      const calculatedProfit = priceAfterVat - priceBeforeVat
      setProfit(calculatedProfit)
    }

    calculateProfit()
  }, [form.watch('price_before_vat'), form.watch('price_after_vat')])

  useEffect(() => {
    if (card) {
      form.setValue('card_number', card.card_number)
      form.setValue('start_date', convertStringToDate(card.start_date))
      form.setValue('price_before_vat', card.price_before_vat)
      form.setValue('price_after_vat', card.price_after_vat)
      form.setValue('company_name', card.company.name)
      form.setValue('offer_name', card.offer?.name)
      form.setValue('comment', card.comment)
    }
  }, [])

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const companies = await window.context.getCompanies()
        setCompanies(companies)
      } catch (e) {
        console.log(e)
      }
    }
    const getOffers = async () => {
      try {
        const offers = await window.context.getOffers()
        setOffers(offers)
      } catch (e) {
        console.log(e)
      }
    }

    getCompanies()
    getOffers()
  }, [])

  const onSubmit = async (data: z.infer<typeof CardValidationSchema>) => {
    setIsLoading(true)

    try {
      if (card) {
        await window.context.updateCard({
          ...card,
          ...data,
          start_date: convertDateToString(data.start_date),
          company: companies.find((company) => company.name === data.company_name)!,
          offer: offers.find((offer) => offer.name === data.offer_name),
          card_type: data.card_number.startsWith('01') ? 'phone' : 'local'
        })

        toast({
          title: 'تم التعديل بنجاح',
          description: 'تم تعديل الخط بنجاح'
        })
      } else {
        await window.context.addCard({
          ...data,
          start_date: convertDateToString(data.start_date),
          company: companies.find((company) => company.name === data.company_name)!,
          offer: offers.find((offer) => offer.name === data.offer_name),
          card_type: data.card_number.startsWith('01') ? 'phone' : 'local'
        })

        toast({
          title: 'تمت الاضافة بنجاح',
          description: 'تمت اضافة الخط بنجاح'
        })
      }
      form.reset()
    } catch (e) {
      console.log(e)
      toast({
        title: 'حدث خطأ',
        description: 'حدث خطأ اثناء اضافة الخط',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full">
      <AddingHeader title={card ? 'تعديل خط' : 'إضافة خط'} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
          <div className="w-[90vh] space-y-2">
            <div className="form-row">
              <CustomFormField
                control={form.control}
                name="card_number"
                label="رقم الخط"
                fieldType={FormFieldType.INPUT}
              />
              <CustomFormField
                control={form.control}
                name="start_date"
                label="تاريخ تشغيل الخط"
                fieldType={FormFieldType.DATE_PICKER}
              />
            </div>

            <div className="form-row">
              <CustomFormField
                control={form.control}
                name="price_before_vat"
                label="السعر قبل الضريبة"
                fieldType={FormFieldType.INPUT}
              />

              <CustomFormField
                control={form.control}
                name="price_after_vat"
                label="السعر بعد الضريبة"
                fieldType={FormFieldType.INPUT}
              />
              <DisabledInput label="المكسب" value={profit.toString()} />
            </div>

            <div className="form-row">
              <CustomFormField
                control={form.control}
                name="company_name"
                label="اسم الشركة"
                fieldType={FormFieldType.SELECT}
                options={companies}
                className="flex-1"
              />

              <CustomFormField
                control={form.control}
                name="offer_name"
                label="اسم العرض"
                fieldType={FormFieldType.SELECT}
                options={offers}
                className="flex-2"
              />
            </div>

            <CustomFormField
              control={form.control}
              name="comment"
              label="ملاحظات"
              fieldType={FormFieldType.TEXTAREA}
              height="h-[35vh]"
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
export default CardForm
