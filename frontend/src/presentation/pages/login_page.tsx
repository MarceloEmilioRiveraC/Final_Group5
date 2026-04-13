import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@app/providers/AuthProvider'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    clearError()

    if (!email || !password) {
      setLocalError('Email and password are required')
      return
    }

    try {
      await login(email, password)
      navigate('/')
    } catch (err: any) {
      setLocalError(err.response?.data?.message || 'Invalid email or password')
    }
  }

  const displayError = error || localError

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-2xl font-bold text-[#2D1B4E]">INSPIRER</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-purple-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">About</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Q&A</a>
            <a href="#" className="text-gray-700 hover:text-purple-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Images */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-40 bg-gradient-to-br from-purple-300 to-purple-400 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <svg className="w-20 h-20 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-br from-blue-300 to-purple-300 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <svg className="w-16 h-16 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="h-32 bg-gradient-to-br from-pink-300 to-purple-300 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <svg className="w-16 h-16 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                </div>
              </div>
              <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <svg className="w-20 h-20 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-[#2D1B4E] mb-2">
              Sign In
            </h1>
            <p className="text-gray-600 mb-8">
              Welcome back to INSPIRER
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  required
                />
              </div>

              {displayError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {displayError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-gray-600 text-sm mt-8">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-600 font-medium hover:underline">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}