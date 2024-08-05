import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { convertCardsToSelectOptions } from '@/utils/utils'
import { CardInfo, CustomerInfo } from '@shared/models'
import { IoMdAdd } from 'react-icons/io'
import CustomSelect from '../CustomSelect'
import { Label } from '../ui/label'

const AddCardToCustomerDialog = ({
  title,
  customer,
  cards
}: {
  title: string
  customer: CustomerInfo
  cards: CardInfo[]
}) => {
  const onChange = (id: string) => {
    console.log(id)
  }

  return (
    <Dialog>
      <DialogTrigger className="flex p-2 w-full justify-between hover:bg-action/20 rounded-lg">
        <IoMdAdd size={20} />
        {title}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            إضافة خط لـ <span className="text-success">{customer.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="flex gap-4 items-center w-full">
            <Label className="text-2xl">الخط</Label>
            <CustomSelect
              options={convertCardsToSelectOptions(cards)}
              placeholder={'الخطوط'}
              onChange={onChange}
              className="flex w-[350px]"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default AddCardToCustomerDialog
