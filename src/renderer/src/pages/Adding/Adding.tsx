import CustomSelect from '@/components/CustomSelect'
import CardForm from '@/components/forms/CardForm'
import CompanyForm from '@/components/forms/CompanyForm'
import CustomerForm from '@/components/forms/CustomerForm'
import OfferForm from '@/components/forms/OfferForm'
import { DropDownOption } from '@shared/types'
import { useState } from 'react'

const options: DropDownOption[] = [
  {
    name: 'اضافة شركة'
  },
  {
    name: 'اضافة عميل'
  },
  {
    name: 'اضافة خط'
  },
  {
    name: 'اضافة عرض'
  }
]

const forms = {
  'اضافة شركة': <CompanyForm />,
  'اضافة عميل': <CustomerForm />,
  'اضافة خط': <CardForm />,
  'اضافة عرض': <OfferForm />
}

const Adding = () => {
  const [form, setPage] = useState('اضافة شركة')

  const onChange = (value: string) => {
    setPage(value)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-5xl">الاضافة</h1>
        <CustomSelect options={options} placeholder={form} onChange={onChange} />
      </div>
      <div className="transition-opacity" key={form}>
        {forms[form]}
      </div>
    </div>
  )
}
export default Adding
