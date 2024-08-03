const TotalStat = ({ cardsTotal, moneyTotal }: { cardsTotal?: number; moneyTotal?: number }) => {
  return (
    <div className="flex gap-4 p-4 border border-black rounded-lg bg-total w-full justify-around">
      <h1 className="text-2xl">الإجمالي</h1>
      <div className="border-l border-black h-8"></div>
      <h2 className="text-xl">عدد الخطوط الإجمالي: {cardsTotal || 0}</h2>
      <div className="border-l border-black h-8"></div>
      <h2 className="text-xl">الإجمالي المالي: {moneyTotal || 0}</h2>
    </div>
  )
}
export default TotalStat
