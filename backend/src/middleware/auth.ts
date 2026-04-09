import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: {
    email: string
    role: string
    iat: number
    exp: number
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export const generateAccessToken = (user: any) => {
  return jwt.sign(
    { email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '15m' }
  )
}

export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    { email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' })
    }
    req.user = user as any
    next()
  })
}

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' })
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Insufficient permissions for this action',
      })
    }

    next()
  }
}