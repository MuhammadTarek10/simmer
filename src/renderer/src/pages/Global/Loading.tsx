import { useSelector } from 'react-redux'
import { RootState } from '../store'

export const LoadingView = () => {
  const isLoading = useSelector((state: RootState) => state.global.isLoading)

  return isLoading && <div className="loading">جاري التحميل...</div>
}
