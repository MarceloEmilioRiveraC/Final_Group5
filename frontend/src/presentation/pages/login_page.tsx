import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@app/providers/AuthProvider'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await login(email, password)
    navigate('/catalogue')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white rounded-lg shadow-lg flex w-[900px]">

        {/* Left image */}
        <div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/login.jpg')" }}
        ></div>

        {/* Right form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-purple-700 text-white py-3 rounded">
              Sign In
            </button>
          </form>

          <p className="mt-4 text-sm">
            Don’t have an account?{' '}
            <Link to="/register" className="text-purple-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}