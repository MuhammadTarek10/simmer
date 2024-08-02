import Adding from '@/pages/Adding'
import Companies, { companiesLoader } from '@/pages/Companies'
import Customers, { customersLoader } from '@/pages/Customers'
import Home from '@/pages/Home'
import Layout from '@/pages/Layout'
import List from '@/pages/List'
import { requireAuth } from '@shared/auth.actions'
import { routes } from '@shared/constants'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import './assets/globals.css'
import Login from './pages/Login'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.home} element={<Layout />} loader={async (_) => await requireAuth()}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.list} element={<List />} />
          <Route path={routes.companies} element={<Companies />} loader={companiesLoader} />
          <Route path={routes.adding} element={<Adding />} />
          <Route path={routes.customers} element={<Customers />} loader={customersLoader} />
        </Route>
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
