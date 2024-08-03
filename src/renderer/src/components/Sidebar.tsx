import addingOn from '@/assets/icons/add-on.svg'
import companiesOn from '@/assets/icons/companies-on.svg'
import customersOn from '@/assets/icons/customer-on.svg'
import homeOn from '@/assets/icons/home-on.svg'
import listOn from '@/assets/icons/list-on.svg'
import sim from '@/assets/icons/sim.svg'
import { routes } from '@shared/constants'
import CustomNavLink from './CustomNavLink'

const sidebarLinks = [
  {
    href: routes.home,
    icon: homeOn,
    alt: 'الرئيسية'
  },
  {
    href: routes.list,
    icon: listOn,
    alt: 'القائمة'
  },
  {
    href: routes.companies,
    icon: companiesOn,
    alt: 'الشركات'
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
    </div>
  )
}
export default Sidebar
