import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
  authorizeRole,
  AuthRequest,
} from '../../middleware/auth'

import { jest } from '@jest/globals'
import { describe, it, expect, beforeEach } from '@jest/globals'
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

describe('Auth Middleware', () => {
  const mockUser = { email: 'test@example.com', role: 'customer' }

  // ---------- Token Generation ----------

  describe('generateAccessToken', () => {
    it('should return a valid JWT string', () => {
      const token = generateAccessToken(mockUser)
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3)
    })

    it('should contain the user email and role in the payload', () => {
      const token = generateAccessToken(mockUser)
      const decoded = jwt.verify(token, JWT_SECRET) as any
      expect(decoded.email).toBe('test@example.com')
      expect(decoded.role).toBe('customer')
    })

    it('should expire in 15 minutes', () => {
      const token = generateAccessToken(mockUser)
      const decoded = jwt.verify(token, JWT_SECRET) as any
      const expectedExpiry = decoded.iat + 15 * 60
      expect(decoded.exp).toBe(expectedExpiry)
    })
  })

  describe('generateRefreshToken', () => {
    it('should return a valid JWT string', () => {
      const token = generateRefreshToken(mockUser)
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3)
    })

    it('should expire in 7 days', () => {
      const token = generateRefreshToken(mockUser)
      const decoded = jwt.verify(token, JWT_SECRET) as any
      const expectedExpiry = decoded.iat + 7 * 24 * 60 * 60
      expect(decoded.exp).toBe(expectedExpiry)
    })
  })

  // ---------- authenticateToken ----------

  describe('authenticateToken', () => {
    let mockReq: Partial<AuthRequest>
    let mockRes: Partial<Response>
    let mockNext: NextFunction

    beforeEach(() => {
      mockReq = { headers: {} }
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      }
      mockNext = jest.fn()
    })

    it('should return 401 if no authorization header is present', () => {
      authenticateToken(mockReq as AuthRequest, mockRes as Response, mockNext)
      expect(mockRes.status).toHaveBeenCalledWith(401)
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'No token provided' })
    })

    it('should return 403 if token is invalid', () => {
      mockReq.headers = { authorization: 'Bearer invalid-token' }
      authenticateToken(mockReq as AuthRequest, mockRes as Response, mockNext)
      expect(mockRes.status).toHaveBeenCalledWith(403)
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' })
    })

    it('should call next() and set req.user for a valid token', () => {
      const token = generateAccessToken(mockUser)
      mockReq.headers = { authorization: `Bearer ${token}` }
      authenticateToken(mockReq as AuthRequest, mockRes as Response, mockNext)
      expect(mockNext).toHaveBeenCalled()
      expect(mockReq.user).toBeDefined()
      expect(mockReq.user!.email).toBe('test@example.com')
    })

    it('should return 403 for an expired token', () => {
      const expiredToken = jwt.sign(
        { email: 'test@example.com', role: 'customer' },
        JWT_SECRET,
        { expiresIn: '0s' }
      )
      mockReq.headers = { authorization: `Bearer ${expiredToken}` }
      authenticateToken(mockReq as AuthRequest, mockRes as Response, mockNext)
      expect(mockRes.status).toHaveBeenCalledWith(403)
    })
  })

  // ---------- authorizeRole ----------

  describe('authorizeRole', () => {
    let mockReq: Partial<AuthRequest>
    let mockRes: Partial<Response>
    let mockNext: NextFunction

    beforeEach(() => {
      mockReq = {}
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      }
      mockNext = jest.fn()
    })

    it('should return 401 if req.user is not set', () => {
      const middleware = authorizeRole(['admin'])
      middleware(mockReq as AuthRequest, mockRes as Response, mockNext)
      expect(mockRes.status).toHaveBeenCalledWith(401)
    })

    it('should return 403 if user role is not in allowed roles', () => {
      mockReq.user = { email: 'test@example.com', role: 'customer', iat: 0, exp: 0 }
      const middleware = authorizeRole(['admin'])
      middleware(mockReq as AuthRequest, mockRes as Response, mockNext)
      expect(mockRes.status).toHaveBeenCalledWith(403)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Insufficient permissions for this action',
      })
    })

    it('should call next() if user role is allowed', () => {
      mockReq.user = { email: 'admin@example.com', role: 'admin', iat: 0, exp: 0 }
      const middleware = authorizeRole(['admin'])
      middleware(mockReq as AuthRequest, mockRes as Response, mockNext)
      expect(mockNext).toHaveBeenCalled()
    })

    it('should allow multiple roles', () => {
      mockReq.user = { email: 'test@example.com', role: 'customer', iat: 0, exp: 0 }
      const middleware = authorizeRole(['admin', 'customer'])
      middleware(mockReq as AuthRequest, mockRes as Response, mockNext)
      expect(mockNext).toHaveBeenCalled()
    })
  })
})
