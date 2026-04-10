import { useNavigate } from 'react-router-dom'
import { useAuth } from '@app/providers/AuthProvider'
import { Button } from './Buttons.tsx'

export const Header = () => {
  const { user, logout, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-purple-600">👗 Fashion Community</h1>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href="/home"
            className="text-gray-700 hover:text-purple-600 font-medium transition"
          >
            Home
          </a>
          <a
            href="/stats"
            className="text-gray-700 hover:text-purple-600 font-medium transition"
          >
            Stats
          </a>

          <div className="flex items-center gap-4 pl-4 border-l border-gray-300">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500">
                {user?.role === 'admin' ? '👑 Admin' : '👤 Customer'}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="secondary"
              size="sm"
              disabled={isLoading}
            >
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
