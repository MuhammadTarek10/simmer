import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'
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
      <Toaster />
    </div>
  )
}
export default Layout
