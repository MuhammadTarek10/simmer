import Companies, { companiesLoader } from '@/pages/Companies/Companies'
import Customers, { customersLoader } from '@/pages/Customers/Customers'
import Layout from '@/pages/Layout'
import { requireAuth } from '@shared/actions/auth.actions'
import { routes } from '@shared/constants'
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './assets/globals.css'
import Error from './components/Error'
import Adding from './pages/Adding/Adding'
import CardDetails, { cardDetailsLoader } from './pages/Cards/CardDetails'
import Cards, { cardsLoader } from './pages/Cards/Cards'
import CompanyDetails, { companyDetailsLoader } from './pages/Companies/CompanyDetails'
import CustomerDetails, { customerDetailsLoader } from './pages/Customers/CustomerDetails'
import Editing, { editingLoader } from './pages/Editing/Editing'
import Home, { homeLoader } from './pages/Home/Home'
import AddCustomerInvoice, { addCustomerInvoiceLoader } from './pages/Invoices/AddCustomerInvoice'
import Invoices, { invoicesLoader } from './pages/Invoices/Invoices'
import InvoicesDetails, { invoicesDetailsLoader } from './pages/Invoices/InvoicesDetails'
import Login from './pages/Login/Login'

function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route>
        <Route path={routes.login} element={<Login />} />
        <Route
          path={routes.home}
          element={<Layout />}
          loader={async (_) => await requireAuth()}
          errorElement={<Error />}
        >
          <Route index element={<Home />} loader={homeLoader} />
          <Route path={routes.companies} element={<Companies />} loader={companiesLoader} />
          <Route
            path={routes.companyDetails}
            element={<CompanyDetails />}
            loader={companyDetailsLoader}
          />
          <Route path={routes.adding} element={<Adding />} />
          <Route path={routes.editing} element={<Editing />} loader={editingLoader} />
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
          <Route
            path={routes.addCustomerInvoice}
            element={<AddCustomerInvoice />}
            loader={addCustomerInvoiceLoader}
          />
        </Route>
      </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
