import '@assets/global.css'
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import CompaniesListPage from './pages/Company/CompaniesListPage'
import Layout from './pages/Layout'

function App(): JSX.Element {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" Component={Layout}>
        <Route index Component={HomePage} />
        <Route path="/companies" Component={CompaniesListPage} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
