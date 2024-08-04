import { cn } from '@/utils/utils'
import { Button } from './ui/button'

interface ButtonProps {
  isLoading: boolean
  className?: string
  children: React.ReactNode
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button type="submit" disabled={isLoading} className={cn(className, 'w-fit')}>
      {isLoading ? <div className="flex items-center gap-4">جاري التحميل...</div> : children}
    </Button>
  )
}

export default SubmitButton
