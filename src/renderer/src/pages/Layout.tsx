import Sidebar from '@/components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex">
      <aside>
        <Sidebar />
      </aside>
      <main className="flex flex-col w-full h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
export default Layout
