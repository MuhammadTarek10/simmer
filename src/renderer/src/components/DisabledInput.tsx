import { Label } from './ui/label'

const DisabledInput = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <Label className="text-2xl">{label}</Label>
      <div className="p-2 border border-black bg-gray-400 rounded-lg">{value || 0}</div>
    </div>
  )
}
export default DisabledInput
