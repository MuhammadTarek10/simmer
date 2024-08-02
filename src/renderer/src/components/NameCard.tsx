const NameCard = ({ name }: { name: string }) => {
  return (
    <div className="flex cursor-pointer">
      <h1>{name}</h1>
    </div>
  )
}
export default NameCard
