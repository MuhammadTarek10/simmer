import addingOn from '@/assets/icons/add-on.svg'
import companiesOn from '@/assets/icons/companies-on.svg'
import customersOn from '@/assets/icons/customer-on.svg'
import homeOn from '@/assets/icons/home-on.svg'
import listOn from '@/assets/icons/list-on.svg'
import { routes } from '@shared/constants'
import CustomNavLink from './CustomNavLink'

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-evenly p-2 gap-2 bg-sidebar sticky top-0 right-0 h-screen items-center">
      <CustomNavLink href={routes.home} icon={homeOn} alt="Home" />
      <CustomNavLink href={routes.list} icon={listOn} alt="List" />
      <CustomNavLink href={routes.companies} icon={companiesOn} alt="Companies" />
      <CustomNavLink href={routes.customers} icon={customersOn} alt="Customers" />
      <CustomNavLink href={routes.adding} icon={addingOn} alt="Add" />
    </div>
  )
}
export default Sidebar
