import SimmerSidebar from './SimmerSidebar'
import { Outlet } from 'react-router-dom'
import { LoadingView } from './Global/Loading'

const Layout = () => {
  return (
    <div className="flex h-screen">
      <aside className="flex-1">
        <SimmerSidebar />
      </aside>
      <main className="flex flex-col flex-5 overflow-y-auto scrollbar-hidden">
        <LoadingView />
        <Outlet />
      </main>
    </div>
  )
}
export default Layout
