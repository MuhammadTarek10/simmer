import Sidebar from '@/components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex">
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <aside>
        <Sidebar />
      </aside>
    </div>
  )
}
export default Layout
