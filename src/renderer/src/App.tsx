import Adding from '@/pages/Adding/Adding'
import Companies, { companiesLoader } from '@/pages/Companies/Companies'
import Customers, { customersLoader } from '@/pages/Customers/Customers'
import Home from '@/pages/Home/Home'
import Layout from '@/pages/Layout'
import List from '@/pages/List/List'
import { requireAuth } from '@shared/auth.actions'
import { routes } from '@shared/constants'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import './assets/globals.css'
import CompanyDetails, { companyDetailsLoader } from './pages/Companies/CompanyDetails'
import CustomerDetails, { customerDetailsLoader } from './pages/Customers/CustomerDetails'
import Login from './pages/Login/Login'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.home} element={<Layout />} loader={async (_) => await requireAuth()}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.list} element={<List />} />
          <Route path={routes.companies} element={<Companies />} loader={companiesLoader} />
          <Route
            path={routes.companyDetails}
            element={<CompanyDetails />}
            loader={companyDetailsLoader}
          />
          <Route path={routes.adding} element={<Adding />} />
          <Route path={routes.customers} element={<Customers />} loader={customersLoader} />
          <Route
            path={routes.customerDetails}
            element={<CustomerDetails />}
            loader={customerDetailsLoader}
          />
        </Route>
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
