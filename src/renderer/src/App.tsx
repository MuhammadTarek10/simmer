import Adding from '@/pages/Adding/Adding'
import Companies, { companiesLoader } from '@/pages/Companies/Companies'
import Customers, { customersLoader } from '@/pages/Customers/Customers'
import Home from '@/pages/Home/Home'
import Layout from '@/pages/Layout'
import List, { listLoader } from '@/pages/List/List'
import { requireAuth } from '@shared/actions/auth.actions'
import { routes } from '@shared/constants'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import './assets/globals.css'
import CardDetails, { cardDetailsLoader } from './pages/Cards/CardDetails'
import Cards, { cardsLoader } from './pages/Cards/Cards'
import CompanyDetails, { companyDetailsLoader } from './pages/Companies/CompanyDetails'
import CustomerDetails, { customerDetailsLoader } from './pages/Customers/CustomerDetails'
import Invoices, { invoicesLoader } from './pages/Invoices/Invoices'
import InvoicesDetails, { invoicesDetailsLoader } from './pages/Invoices/InvoicesDetails'
import Login from './pages/Login/Login'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.home} element={<Layout />} loader={async (_) => await requireAuth()}>
          <Route index path={routes.home} element={<Home />} />
          <Route path={routes.list} element={<List />} loader={listLoader} />
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
          <Route path={routes.cards} element={<Cards />} loader={cardsLoader} />
          <Route path={routes.cardDetails} element={<CardDetails />} loader={cardDetailsLoader} />
          <Route path={routes.invoices} element={<Invoices />} loader={invoicesLoader} />
          <Route
            path={routes.invoiceDetails}
            element={<InvoicesDetails />}
            loader={invoicesDetailsLoader}
          />
        </Route>
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
