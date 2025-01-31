import { useDispatch, useSelector } from 'react-redux'
import SimmerSidebar from './SimmerSidebar'
import { Outlet } from 'react-router-dom'
import { RootState } from './store'
import { ErrorModal } from './Global/ErrorModal'
import { clearError } from './Global/state/global-slice'

const Layout = () => {
  const { isLoading, error } = useSelector((state: RootState) => state.global)
  const dispatch = useDispatch()

  return (
    <div className="flex">
      <aside className="flex-1">
        <SimmerSidebar />
      </aside>
      <main className="flex flex-5">
        {isLoading && <div className="container center">Loading...</div>}
        <ErrorModal error={error} onClose={() => dispatch(clearError())} />
        <Outlet />
      </main>
    </div>
  )
}
export default Layout
