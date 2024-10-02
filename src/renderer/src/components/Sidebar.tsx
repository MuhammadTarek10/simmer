import addingOn from '@/assets/icons/add-on.svg'
import companiesOn from '@/assets/icons/companies-on.svg'
import customersOn from '@/assets/icons/customer-on.svg'
import homeOn from '@/assets/icons/home-on.svg'
import money from '@/assets/icons/money.svg'
import sim from '@/assets/icons/sim.svg'
import { routes } from '@shared/constants'
import { FileIcon } from 'lucide-react'
import { importFile } from '../repositories/file.repository'
import CustomNavLink from './CustomNavLink'

const sidebarLinks = [
  {
    href: routes.home,
    icon: homeOn,
    alt: 'الرئيسية'
  },
  {
    href: routes.customers,
    icon: customersOn,
    alt: 'المشتركين'
  },
  {
    href: routes.cards,
    icon: sim,
    alt: 'الخطوط'
  },
  {
    href: routes.companies,
    icon: companiesOn,
    alt: 'الشركات'
  },
  {
    href: routes.invoices,
    icon: money,
    alt: 'الفواتير'
  },
  {
    href: routes.adding,
    icon: addingOn,
    alt: 'الاضافة'
  }
]

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-evenly p-2 gap-2 bg-sidebar sticky top-0 right-0 h-screen items-center">
      {sidebarLinks.map((link) => (
        <CustomNavLink key={link.alt} href={link.href} icon={link.icon} alt={link.alt} />
      ))}
      <div className="cursor-pointer" onClick={importFile}>
        <FileIcon className="w-10 h-10" />
      </div>
    </div>
  )
}
export default Sidebar
