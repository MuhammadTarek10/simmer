import { cardsColumns } from '@/components/columns/cards-columns'
import CustomDropDownMenu from '@/components/CustomDropDownMenu'
import { DataTable } from '@/components/ui/data-table'
import { extractCompanyDetails } from '@/utils/utils'
import { requireAuth } from '@shared/auth.actions'
import { mockCompaniesDetails } from '@shared/mocks/dummy'
import { CompanyInfo } from '@shared/models'
import { DropDownOption } from '@shared/types'
import { BsTrash } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import { defer, useLoaderData } from 'react-router-dom'
import CardsStat from './components/CardsStat'
import TotalStat from './components/TotalStat'

const options: DropDownOption[] = [
  { name: 'تعديل', icon: <FaRegEdit size={20} /> },
  { name: 'حذف', className: 'text-red-500', icon: <BsTrash size={20} /> }
]

export async function companyDetailsLoader({ params }) {
  console.log(params)
  await requireAuth()
  return defer({ company: mockCompaniesDetails })
}

const CompanyDetails = () => {
  const { company } = useLoaderData() as { company: CompanyInfo }
  const {
    phoneTotal,
    phoneTotalBeforeVat,
    phoneTotalAfterVat,
    localTotal,
    localTotalBeforeVat,
    localTotalAfterVat,
    cardsTotal,
    moneyTotal
  } = extractCompanyDetails(company)
  return (
    <div className="px-4 py-6 h-full gap-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl">{company.name}</h1>
          <h1 className="text-2xl text-subtitle">تاريخ السداد: {company.invoice_date}</h1>
        </div>
        <CustomDropDownMenu options={options} />
      </div>
      <div>
        <hr className="my-4 border-gray-300" />
        <div className="w-fit">
          <div className="flex gap-4 w-full">
            <CardsStat
              title="الموبايل"
              number_of_phones={phoneTotal}
              price_before_vat={phoneTotalBeforeVat}
              price_after_vat={phoneTotalAfterVat}
            />
            <CardsStat
              title="الارضي"
              number_of_phones={localTotal}
              price_before_vat={localTotalBeforeVat}
              price_after_vat={localTotalAfterVat}
            />
          </div>
          <div>
            <TotalStat cardsTotal={cardsTotal} moneyTotal={moneyTotal} />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <hr className="my-4 border-gray-300" />
        <DataTable data={company.cards || []} columns={cardsColumns} />
      </div>
    </div>
  )
}
export default CompanyDetails
