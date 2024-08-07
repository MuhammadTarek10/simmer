const NameCard = ({ name, icon }: { name: string; icon: string }) => {
  return (
    <div className="flex cursor-pointer items-center border shadow-sm rounded-lg border-none">
      <img src={icon} height={60} width={60} className="m-4 bg-list p-4 rounded-lg" />
      <h1 className="text-2xl">{name}</h1>
    </div>
  )
}
export default NameCard
