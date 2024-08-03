import Stat from './Stat'

const CardsStat = ({
  title,
  number_of_phones,
  price_before_vat,
  price_after_vat
}: {
  title: string
  number_of_phones?: number
  price_before_vat?: number
  price_after_vat?: number
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Stat label="عدد الخطوط" value={number_of_phones} />
      <Stat label="السعر قبل الضريبة" value={price_before_vat} />
      <Stat label="السعر بعد الضريبة" value={price_after_vat} />
    </div>
  )
}
export default CardsStat
