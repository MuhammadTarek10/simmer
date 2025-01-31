import SimmerSidebar from './SimmerSidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex">
      <aside className="flex-1">
        <SimmerSidebar />
      </aside>
      <main className="flex flex-col flex-5">
        <Outlet />
      </main>
    </div>
  )
}
export default Layout
