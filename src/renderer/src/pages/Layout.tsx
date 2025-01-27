import SimmerSidebar from '@components/SimmerSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex">
      <aside className="flex-1">
        <SimmerSidebar />
      </aside>
      <main className="flex flex-3">
        <Outlet />
      </main>
    </div>
  )
}
export default Layout
