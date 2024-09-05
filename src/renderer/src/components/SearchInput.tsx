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
    <div className="flex w-full gap-2 items-center my-2">
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
