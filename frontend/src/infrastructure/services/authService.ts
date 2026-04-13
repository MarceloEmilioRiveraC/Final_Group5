import { api } from '@infrastructure/api/axiosInstance'
import type { User, AuthResponse } from '@domain/entities/User'

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await api.post('/users/login', { email, password })
  return data
}

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: 'admin' | 'customer' = 'customer'
): Promise<{ user: User }> => {
  const { data } = await api.post('/users/register', {
    email,
    password,
    name,
    role,
  })
  return data
}

export const getProfile = async (): Promise<{ user: User }> => {
  const { data } = await api.get('/users/profile')
  return data
}

export const refreshAccessToken = async (
  refreshToken: string
): Promise<{ accessToken: string }> => {
  const { data } = await api.post('/users/refresh-token', { refreshToken })
  return data
}

export const logout = async (): Promise<void> => {
  try {
    await api.post('/users/logout')
  } finally {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }
}
