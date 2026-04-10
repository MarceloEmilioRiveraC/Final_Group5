import { Response } from 'express'
import * as userService from '../services/userService'
import { AuthRequest } from '../middleware/auth'

export const register = async (req: any, res: Response) => {
  try {
    const { email, password, name, role } = req.body

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: 'Email, password, and name are required' })
    }

    const user = await userService.registerUser({
      email,
      password,
      name,
      role,
    })

    res.status(201).json({
      message: 'User registered successfully',
      user,
    })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const login = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const result = await userService.loginUser({ email, password })

    res.json(result)
  } catch (error: any) {
    res.status(401).json({ message: error.message })
  }
}

export const refreshToken = async (req: any, res: Response) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' })
    }

    const result = userService.refreshAccessToken(refreshToken)

    res.json(result)
  } catch (error: any) {
    res.status(403).json({ message: error.message })
  }
}

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.getUserByEmail(req.user!.email)

    res.json({
      message: 'User profile retrieved',
      user,
    })
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export const logout = async (_req: AuthRequest, res: Response) => {
  try {
    res.status(204).json({ message: 'Logged out successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
