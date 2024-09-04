import { cardsColumns } from '@/components/columns/cards-columns'
import CustomDropDownMenu from '@/components/CustomDropDownMenu'
import { DataTable } from '@/components/ui/data-table'
import { extractCompanyDetails } from '@/utils/utils'
import { CardInfo, CompanyInfo } from '@shared/models'
import { DropDownOption } from '@shared/types'
import { BsTrash } from 'react-icons/bs'
import { FaRegEdit } from 'react-icons/fa'
import { defer, useLoaderData, useNavigate } from 'react-router-dom'
import CardsStat from './components/CardsStat'
import TotalStat from './components/TotalStat'

export async function companyDetailsLoader({ params }) {
  const company = await window.context.getCompany(params.id)
  const cards = await window.context.getCardsFromCompanyId(params.id)
  return defer({ company: company, cards: cards })
}

const CompanyDetails = () => {
  const navigate = useNavigate()
  const { company, cards } = useLoaderData() as { company: CompanyInfo; cards: CardInfo[] }
  const options: DropDownOption[] = [
    {
      name: 'تعديل',
      icon: <FaRegEdit size={20} />,
      onClick: () => navigate(`/edit/${company.id}/company`)
    },
    { name: 'حذف', className: 'text-red-500', icon: <BsTrash size={20} /> }
  ]
  const {
    phoneTotal,
    phoneTotalBeforeVat,
    phoneTotalAfterVat,
    localTotal,
    localTotalBeforeVat,
    localTotalAfterVat,
    cardsTotal,
    moneyTotal
  } = extractCompanyDetails(cards)
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
        <DataTable data={cards} columns={cardsColumns} />
      </div>
    </div>
  )
}
export default CompanyDetails
