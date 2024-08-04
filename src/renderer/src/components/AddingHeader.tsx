const AddingHeader = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 className="flex text-4xl justify-center">{title}</h1>
      <hr className="flex mb-12 mt-2 border border-black w-[20vw] mx-auto" />
    </div>
  )
}
export default AddingHeader
