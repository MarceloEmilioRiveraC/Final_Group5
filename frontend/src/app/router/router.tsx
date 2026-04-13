import { createBrowserRouter } from 'react-router-dom'
import { AppProvider } from '@app/providers/AppProvider'
import { ProtectedRoute } from '@app/providers/ProtectedRoute'
import StatsPage from '@presentation/pages/StatsPage'
import { HomePage } from '@presentation/pages/Home'
import { CataloguePage } from '@presentation/pages/Catalogue'
import { LoginPage } from '@presentation/pages/login_page'
import { RegisterPage } from '@presentation/pages/register_page'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
)

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <CataloguePage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: (
      <AppProvider>
        <ProtectedLayout>
          <HomePage />
        </ProtectedLayout>
      </AppProvider>
    ),
  },
  {
    path: '/home',
    element: (
      <AppProvider>
        <ProtectedLayout>
          <HomePage />
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