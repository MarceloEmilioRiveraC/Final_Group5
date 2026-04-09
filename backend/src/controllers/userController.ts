import { Request, Response } from 'express'
import * as userService from '../services/userService'
import jwt from 'jsonwebtoken'

const SECRET = 'secret123'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await userService.createUser(email, password)

    res.json(user)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await userService.loginUser(email, password)

    const token = jwt.sign({ id: user._id }, SECRET)

    res.json({ token })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers()
  res.json(users)
}