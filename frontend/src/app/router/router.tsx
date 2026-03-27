import { createBrowserRouter } from 'react-router-dom'
import StatsPage from '@presentation/pages/StatsPage'
import { Home } from '@presentation/pages/Home'

export const router = createBrowserRouter([
  { path: '/',       element: <Home /> },
  { path: '/stats',  element: <StatsPage /> },
])