import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@app/providers/AuthProvider'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await register(email, password, name, 'customer')
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white rounded-lg shadow-lg flex w-[900px]">

        {/* Left */}
        <div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/register.jpg')" }}
        ></div>

        {/* Right */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded"
              onChange={(e) => setName(e.target.value)}
            />

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
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}