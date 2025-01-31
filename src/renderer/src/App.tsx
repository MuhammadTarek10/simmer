import '@assets/global.css'
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import CompaniesListPage from './pages/Company/CompaniesListPage'
import Layout from './pages/Layout'
import CompanyDetailsPage from './pages/Company/CompanyDetailsPage'
import ErrorPage from './pages/Global/ErrorPage'
import { Provider } from 'react-redux'
import { store } from './pages/store'
import CardListPage from './pages/Card/CardListPage'
import CardDetailsPage from './pages/Card/CardDetailsPage'
import CustomerListPage from './pages/Customer/CustomerListPage'
import CustomerDetailsPage from './pages/Customer/CustomerDetailsPage'

function App(): JSX.Element {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" Component={Layout} errorElement={<ErrorPage />}>
        <Route index Component={HomePage} />
        <Route path="/companies">
          <Route index Component={CompaniesListPage} />
          <Route path=":id" Component={CompanyDetailsPage} />
        </Route>
        <Route path="/cards">
          <Route index Component={CardListPage} />
          <Route path=":id" Component={CardDetailsPage} />
        </Route>
        <Route path="/customers">
          <Route index Component={CustomerListPage} />
          <Route path=":id" Component={CustomerDetailsPage} />
        </Route>
      </Route>
    )
  )

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
