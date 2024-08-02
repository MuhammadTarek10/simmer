import { NavLink } from 'react-router-dom'

const CustomNavLink = ({ href, icon, alt }: { href: string; icon: string; alt: string }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        ['p-4', isActive ? 'bg-action border-action rounded-lg' : undefined]
          .filter(Boolean)
          .join(' ')
      }
      to={href}
    >
      <img src={icon} alt={alt} height={32} width={32} />
    </NavLink>
  )
}
export default CustomNavLink
