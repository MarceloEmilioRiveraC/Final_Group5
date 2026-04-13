import { useNavigate } from 'react-router-dom'
import { useAuth } from '@app/providers/AuthProvider'

export const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-semibold tracking-wide text-gray-800">
          INSPIRER
        </h1>

        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-purple-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-gray-600 hover:text-purple-600"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Purple Navbar */}
      <div className="bg-purple-900 text-white py-3 flex justify-center gap-8 font-medium">
        <a href="/" className="hover:text-gray-300">Home</a>
        <a href="#" className="hover:text-gray-300">About</a>
        <a href="#" className="hover:text-gray-300">Q&A</a>
        <a href="#" className="hover:text-gray-300">Contact</a>
      </div>
    </div>
  )
}