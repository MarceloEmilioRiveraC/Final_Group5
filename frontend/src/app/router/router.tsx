import { createBrowserRouter } from 'react-router-dom'
import { AppProvider } from '@app/providers/AppProvider'
import { ProtectedRoute } from '@app/providers/ProtectedRoute'
import StatsPage from '@presentation/pages/StatsPage'
import { HomePage } from '@presentation/pages/Home'
import { LoginPage } from '@presentation/pages/login_page'
import { RegisterPage } from '@presentation/pages/register_page'
import CataloguePage from '@presentation/pages/Catalogue'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />, 
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/catalogue',
    element: (
      <AppProvider>
        <ProtectedLayout>
          <CataloguePage />
        </ProtectedLayout>
      </AppProvider>
    ),
  },
  {
    path: '/stats',
    element: (
      <AppProvider>
        <ProtectedLayout>
          <StatsPage />
        </ProtectedLayout>
      </AppProvider>
    ),
  },
])