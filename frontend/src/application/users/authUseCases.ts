import * as authService from '@infrastructure/services/authService'
import type { User, AuthResponse } from '@domain/entities/User'

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return authService.loginUser(email, password)
}

export const register = async (
  email: string,
  password: string,
  name: string,
  role: 'admin' | 'customer' = 'customer'
): Promise<{ user: User }> => {
  return authService.registerUser(email, password, name, role)
}

export const getProfile = async (): Promise<{ user: User }> => {
  return authService.getProfile()
}

export const logout = async (): Promise<void> => {
  return authService.logout()
}

export const refreshToken = async (
  refreshToken: string
): Promise<{ accessToken: string }> => {
  return authService.refreshAccessToken(refreshToken)
}