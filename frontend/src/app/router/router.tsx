import { createBrowserRouter } from 'react-router-dom'
import StatsPage from '@presentation/pages/StatsPage'
import { Home } from '@presentation/pages/Home'
import { LoginPage } from '@presentation/pages/login_page'

export const router = createBrowserRouter([
  { path: '/',       element: <LoginPage /> },
  { path: '/home',   element: <Home /> },
  { path: '/stats',  element: <StatsPage /> },
])