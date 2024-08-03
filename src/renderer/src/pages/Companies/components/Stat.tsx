const Stat = ({ label, value }: { label: string; value?: number }) => {
  return (
    <div className="flex gap-4 py-4 px-2 w-[350px] border border-black rounded-lg my-2 justify-between">
      <span>{label}</span>
      <span>{value || 0}</span>
    </div>
  )
}
export default Stat
