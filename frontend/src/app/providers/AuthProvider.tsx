import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@domain/entities/User'
import * as authUseCases from '@application/users/authUseCases'

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, role?: 'admin' | 'customer') => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('user')
      const accessToken = localStorage.getItem('accessToken')

      if (storedUser && accessToken) {
        try {
          setUser(JSON.parse(storedUser))
        } catch {
          localStorage.removeItem('user')
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }

      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authUseCases.login(email, password)

      localStorage.setItem('accessToken', result.accessToken)
      localStorage.setItem('refreshToken', result.refreshToken)
      localStorage.setItem('user', JSON.stringify(result.user))

      setUser(result.user)
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Login failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    role: 'admin' | 'customer' = 'customer'
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authUseCases.register(email, password, name, role)
      // After registration, don't auto-login - redirect to login page
      // You can modify this behavior if you want auto-login after registration
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Registration failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await authUseCases.logout()
      setUser(null)
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Logout failed'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
