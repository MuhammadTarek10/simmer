import { BsSearch } from 'react-icons/bs'
import { Input } from './ui/input'

const SearchInput = ({
  value,
  onChange
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className="flex w-full gap-2 items-center my-2">
      <Input className="p-4 rounded-2xl" placeholder="🔍 بحث" value={value} onChange={onChange} />
    </div>
  )
}
export default SearchInput
