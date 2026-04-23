import { createBrowserRouter } from 'react-router-dom'
import { AppProvider } from '@app/providers/AppProvider'
import { ProtectedRoute } from '@app/providers/ProtectedRoute'
import StatsPage from '@presentation/pages/StatsPage'
import { HomePage } from '@presentation/pages/Home'
import { CataloguePage } from '@presentation/pages/Catalogue'
import { LoginPage } from '@presentation/pages/login_page'
import { RegisterPage } from '@presentation/pages/register_page'
import CataloguePage from '@presentation/pages/Catalogue'

const ProtectedLayout = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'admin' | 'customer' }) => (
  <ProtectedRoute requiredRole={requiredRole}>{children}</ProtectedRoute>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />, 
  },
  {
    path: '/login',
    element: <CataloguePage />,
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
        <ProtectedLayout requiredRole="admin">
          <StatsPage />
        </ProtectedLayout>
      </AppProvider>
    ),
  },
])