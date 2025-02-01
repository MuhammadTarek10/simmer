import { Button } from '@shadcn/ui/button'
import { useSelector } from 'react-redux'
import { useRouteError } from 'react-router-dom'
import { RootState } from '../store'

const ErrorPage = () => {
  const message = useSelector((state: RootState) => state.global.error)
  const error = useRouteError() as Error

  return (
    <div className="container center">
      <h1>حدث خطأ</h1>
      <p>{message || error.message}</p>
      <Button onClick={() => window.location.reload()}>إعادة التحميل</Button>
    </div>
  )
}

export default ErrorPage
