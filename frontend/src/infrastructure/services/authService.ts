<<<<<<< HEAD
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
=======
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel, UserRole } from '../models/User'
import { generateAccessToken, generateRefreshToken } from '../middleware/auth'

interface RegisterData {
  email: string
  password: string
  name: string
  role?: UserRole
}

interface LoginData {
  email: string
  password: string
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export const registerUser = async (data: RegisterData) => {
  const existingUser = await UserModel.findOne({ email: data.email })

  if (existingUser) {
    throw new Error('Email already registered')
  }

  const salt = await bcryptjs.genSalt(10)
  const hashedPassword = await bcryptjs.hash(data.password, salt)

  const user = new UserModel({
    email: data.email,
    password: hashedPassword,
    name: data.name,
    role: data.role || UserRole.CUSTOMER,
  })

  await user.save()

  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}

export const loginUser = async (data: LoginData) => {
  const user = await UserModel.findOne({ email: data.email })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isPasswordValid = await bcryptjs.compare(data.password, user.password)

  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  }
}

export const refreshAccessToken = (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as any

    const mockUser = { email: decoded.email, role: decoded.role }
    const newAccessToken = generateAccessToken(mockUser)

    return { accessToken: newAccessToken }
  } catch (error) {
    throw new Error('Invalid refresh token')
  }
}

export const getUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email })

  if (!user) {
    throw new Error('User not found')
  }

  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}
>>>>>>> 1ad11ef1edf9efdefd8b6e11ee5d5727c89ae0f3
