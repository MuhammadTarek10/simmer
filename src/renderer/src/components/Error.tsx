import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const Error = () => {
  const navigate = useNavigate()

  const backToHome = () => {
    navigate('/')
  }

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center gap-4">
      <h1 className="text-4xl font-bold text-failure">حدث خطأ</h1>
      <Button className="bg-action text-2xl px-4 py-6" onClick={backToHome}>
        العودة للصفحة الرئيسية
      </Button>
    </div>
  )
}
export default Error
