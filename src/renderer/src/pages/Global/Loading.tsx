import { useSelector } from 'react-redux'
import { RootState } from '../store'

export const Loading = () => {
  const isLoading = useSelector((state: RootState) => state.global.isLoading)

  return isLoading && <div className="container center">Loading...</div>
}
