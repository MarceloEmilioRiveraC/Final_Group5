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
