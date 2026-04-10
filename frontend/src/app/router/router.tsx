import { createBrowserRouter } from 'react-router-dom'
import StatsPage from '@presentation/pages/StatsPage'
import { HomePage } from '@presentation/pages/Home'
import CataloguePage from '@presentation/pages/Catalogue'
// import { LoginPage } from '@presentation/pages/login_page'

export const router = createBrowserRouter([
  // { path: '/',       element: <LoginPage /> },
  // { path: '/',   element: <HomePage /> },
  {path: '/',   element: <CataloguePage /> },
  // { path: '/',  element: <StatsPage /> },
])