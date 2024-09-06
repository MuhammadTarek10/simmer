import { Input } from './ui/input'

const SearchInput = ({
  placeholder = '🔍 بحث',
  value,
  onChange
}: {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className="flex w-full mr-4 ml-4">
      <Input
        className="p-4 rounded-2xl"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
export default SearchInput
