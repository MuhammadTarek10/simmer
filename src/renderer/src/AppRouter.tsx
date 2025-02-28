import { Provider } from 'react-redux'
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import CardDetailsPage from './pages/Card/CardDetailsPage'
import CardListPage from './pages/Card/CardListPage'
import CompaniesListPage from './pages/Company/CompaniesListPage'
import CompanyDetailsPage from './pages/Company/CompanyDetailsPage'
import CustomerDetailsPage from './pages/Customer/CustomerDetailsPage'
import CustomerListPage from './pages/Customer/CustomerListPage'
import ErrorPage from './pages/Global/ErrorPage'
import HomePage from './pages/Home/HomePage'
import { store } from './pages/store'
import Layout from './pages/Layout'

const AppRouter = () => {
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

export default AppRouter
