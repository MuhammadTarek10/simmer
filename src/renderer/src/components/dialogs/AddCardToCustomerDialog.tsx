import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { convertCardsToSelectOptions } from '@/utils/utils'
import { DialogDescription } from '@radix-ui/react-dialog'
import { CardInfo, CustomerInfo } from '@shared/models'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import CustomSelect from '../CustomSelect'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useToast } from '../ui/use-toast'

const AddCardToCustomerDialog = ({
  title,
  customer,
  cards,
  updatePage
}: {
  title: string
  customer: CustomerInfo
  cards: CardInfo[]
  updatePage: () => void
}) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null)

  const onChange = (id: string) => {
    setSelectedCard(cards.find((card) => card.id === id)!)
  }

  const onSubmit = async () => {
    if (selectedCard) {
      try {
        selectedCard.customer = customer
        await window.context.updateCard(selectedCard)
        toast({
          title: 'تمت الاضافة بنجاح',
          description: 'تمت اضافة الخط بنجاح'
        })
        updatePage()
      } catch (e) {
        console.log(e)
        toast({
          title: 'حدث خطأ',
          description: 'حدث خطأ اثناء اضافة الخط',
          variant: 'destructive'
        })
      } finally {
        setOpen(false)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex p-2 w-full justify-between hover:bg-action/20 rounded-lg">
        <IoMdAdd size={20} />
        {title}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center gap-1">
            <span>إضافة خط لـ</span>
            <span className="text-success">{customer.name}</span>
          </DialogTitle>
          <DialogDescription className="flex justify-center">
            يمكنك اختيار الخط الذي تريد إضافته للعميل
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col p-4 gap-4">
          <div className="flex gap-4 items-center w-full">
            <Label className="text-2xl">الخط</Label>
            <CustomSelect
              options={convertCardsToSelectOptions(cards)}
              placeholder={'الخطوط'}
              onChange={onChange}
              className="flex w-[350px]"
            />
          </div>
          <div className="flex gap-2">
            <Button className="w-full text-xl font-bold bg-action" onClick={onSubmit}>
              إضافة
            </Button>
            <Button className="w-full text-xl font-bold bg-failure" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default AddCardToCustomerDialog
