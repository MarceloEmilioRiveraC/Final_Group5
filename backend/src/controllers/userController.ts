import { Request, Response } from 'express'
import * as userService from '../services/userService'
import { AuthRequest } from '../middleware/auth'

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.registerUser(req.body)
    res.status(201).json({ message: 'User registered successfully', user })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const result = await userService.loginUser(req.body)
    res.json(result)
  } catch (error: any) {
    res.status(401).json({ message: error.message })
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body
    const result = await userService.refreshAccessToken(refreshToken)
    res.json(result)
  } catch (error: any) {
    res.status(401).json({ message: error.message })
  }
}

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' })
    const user = await userService.getUserByEmail(req.user.email)
    res.json({ message: 'User profile retrieved', user })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const logout = async (req: AuthRequest, res: Response) => {
  res.status(204).send()
}