import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

describe('UserService', () => {

  // ---------- registerUser ----------

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      jest.resetModules()
      const mockSave = jest.fn().mockResolvedValue(undefined)
      const mockInstance = {
        _id: 'user-id-123',
        email: 'new@example.com',
        name: 'New User',
        role: 'customer',
        password: 'hashedPassword',
        save: mockSave,
      }
      jest.mock('../../models/User', () => ({
        UserModel: Object.assign(jest.fn().mockImplementation(() => mockInstance), {
          findOne: jest.fn().mockResolvedValue(null),
        }),
        UserRole: { ADMIN: 'admin', CUSTOMER: 'customer' },
      }))
      jest.mock('bcryptjs', () => ({
        genSalt: jest.fn().mockResolvedValue('salt'),
        hash: jest.fn().mockResolvedValue('hashedPassword'),
        compare: jest.fn(),
      }))
      jest.mock('../../middleware/auth', () => ({
        generateAccessToken: jest.fn(),
        generateRefreshToken: jest.fn(),
      }))

      const freshService = require('../../services/userService')
      const result = await freshService.registerUser({
        email: 'new@example.com',
        password: 'password123',
        name: 'New User',
      })

      expect(result).toEqual({
        _id: 'user-id-123',
        email: 'new@example.com',
        name: 'New User',
        role: 'customer',
      })
      expect(mockSave).toHaveBeenCalled()
    })

    it('should throw if email is already registered', async () => {
      jest.resetModules()
      jest.mock('../../models/User', () => ({
        UserModel: Object.assign(jest.fn(), {
          findOne: jest.fn().mockResolvedValue({ email: 'existing@example.com' }),
        }),
        UserRole: { ADMIN: 'admin', CUSTOMER: 'customer' },
      }))
      jest.mock('bcryptjs', () => ({ genSalt: jest.fn(), hash: jest.fn(), compare: jest.fn() }))
      jest.mock('../../middleware/auth', () => ({ generateAccessToken: jest.fn(), generateRefreshToken: jest.fn() }))

      const freshService = require('../../services/userService')
      await expect(
        freshService.registerUser({
          email: 'existing@example.com',
          password: 'password123',
          name: 'Test',
        })
      ).rejects.toThrow('Email already registered')
    })
  })

  // ---------- loginUser ----------

  describe('loginUser', () => {
    it('should login with valid credentials and return tokens', async () => {
      jest.resetModules()
      const mockUser = {
        _id: 'user-id-123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'customer',
        password: 'hashedPassword',
      }
      jest.mock('../../models/User', () => ({
        UserModel: Object.assign(jest.fn(), {
          findOne: jest.fn().mockResolvedValue(mockUser),
        }),
        UserRole: { ADMIN: 'admin', CUSTOMER: 'customer' },
      }))
      jest.mock('bcryptjs', () => ({
        genSalt: jest.fn(),
        hash: jest.fn(),
        compare: jest.fn().mockResolvedValue(true),
      }))
      jest.mock('../../middleware/auth', () => ({
        generateAccessToken: jest.fn().mockReturnValue('access-token'),
        generateRefreshToken: jest.fn().mockReturnValue('refresh-token'),
      }))

      const freshService = require('../../services/userService')
      const result = await freshService.loginUser({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: {
          _id: 'user-id-123',
          email: 'test@example.com',
          name: 'Test User',
          role: 'customer',
        },
      })
    })

    it('should throw if user is not found', async () => {
      jest.resetModules()
      jest.mock('../../models/User', () => ({
        UserModel: Object.assign(jest.fn(), {
          findOne: jest.fn().mockResolvedValue(null),
        }),
        UserRole: { ADMIN: 'admin', CUSTOMER: 'customer' },
      }))
      jest.mock('bcryptjs', () => ({ genSalt: jest.fn(), hash: jest.fn(), compare: jest.fn() }))
      jest.mock('../../middleware/auth', () => ({ generateAccessToken: jest.fn(), generateRefreshToken: jest.fn() }))

      const freshService = require('../../services/userService')
      await expect(
        freshService.loginUser({ email: 'nonexistent@example.com', password: 'pass' })
      ).rejects.toThrow('Invalid email or password')
    })

    it('should throw if password is invalid', async () => {
      jest.resetModules()
      jest.mock('../../models/User', () => ({
        UserModel: Object.assign(jest.fn(), {
          findOne: jest.fn().mockResolvedValue({
            _id: 'id', email: 'test@example.com', name: 'Test', role: 'customer', password: 'hashed',
          }),
        }),
        UserRole: { ADMIN: 'admin', CUSTOMER: 'customer' },
      }))
      jest.mock('bcryptjs', () => ({
        genSalt: jest.fn(), hash: jest.fn(),
        compare: jest.fn().mockResolvedValue(false),
      }))
      jest.mock('../../middleware/auth', () => ({ generateAccessToken: jest.fn(), generateRefreshToken: jest.fn() }))

      const freshService = require('../../services/userService')
      await expect(
        freshService.loginUser({ email: 'test@example.com', password: 'wrong' })
      ).rejects.toThrow('Invalid email or password')
    })
  })

  // ---------- refreshAccessToken ----------

  describe('refreshAccessToken', () => {
    it('should return a new access token for a valid refresh token', () => {
      jest.resetModules()
      jest.mock('../../models/User', () => ({
        UserModel: Object.assign(jest.fn(), { findOne: jest.fn() }),
        UserRole: { ADMIN: 'admin', CUSTOMER: 'customer' },
      }))
      jest.mock('bcryptjs', () => ({ genSalt: jest.fn(), hash: jest.fn(), compare: jest.fn() }))
      jest.mock('../../middleware/auth', () => ({
        generateAccessToken: jest.fn().mockReturnValue('new-access-token'),
        generateRefreshToken: jest.fn(),
      }))

      const validRefreshToken = jwt.sign(
        { email: 'test@example.com', role: 'customer' },
        JWT_SECRET,
        { expiresIn: '7d' }
      )

      const freshService = require('../../services/userService')
      const result = freshService.refreshAccessToken(validRefreshToken)
      expect(result).toEqual({ accessToken: 'new-access-token' })
    })

    it('should throw for an invalid refresh token', () => {
      jest.resetModules()
      jest.mock('../../models/User', () => ({
        UserModel: Object.assign(jest.fn(), { findOne: jest.fn() }),
        UserRole: { ADMIN: 'admin', CUSTOMER: 'customer' },
      }))
      jest.mock('bcryptjs', () => ({ genSalt: jest.fn(), hash: jest.fn(), compare: jest.fn() }))
      jest.mock('../../middleware/auth', () => ({
        generateAccessToken: jest.fn(), generateRefreshToken: jest.fn(),
      }))

      const freshService = require('../../services/userService')
      expect(() => freshService.refreshAccessToken('invalid-token')).toThrow('Invalid refresh token')
    })
  })

  // ---------- getUserByEmail ----------

  describe('getUserByEmail', () => {
    it('should return user data when found', async () => {
      jest.resetModules()
      const mockUser = { _id: 'id-1', email: 'found@example.com', name: 'Found', role: 'customer' }
      jest.mock('../../models/User', () => ({
        UserModel: Object.assign(jest.fn(), {
          findOne: jest.fn().mockResolvedValue(mockUser),
        }),
        UserRole: { ADMIN: 'admin', CUSTOMER: 'customer' },
      }))
      jest.mock('bcryptjs', () => ({ genSalt: jest.fn(), hash: jest.fn(), compare: jest.fn() }))
      jest.mock('../../middleware/auth', () => ({ generateAccessToken: jest.fn(), generateRefreshToken: jest.fn() }))

      const freshService = require('../../services/userService')
      const result = await freshService.getUserByEmail('found@example.com')
      expect(result).toEqual({
        _id: 'id-1',
        email: 'found@example.com',
        name: 'Found',
        role: 'customer',
      })
    })

    it('should throw if user is not found', async () => {
      jest.resetModules()
      jest.mock('../../models/User', () => ({
        UserModel: Object.assign(jest.fn(), {
          findOne: jest.fn().mockResolvedValue(null),
        }),
        UserRole: { ADMIN: 'admin', CUSTOMER: 'customer' },
      }))
      jest.mock('bcryptjs', () => ({ genSalt: jest.fn(), hash: jest.fn(), compare: jest.fn() }))
      jest.mock('../../middleware/auth', () => ({ generateAccessToken: jest.fn(), generateRefreshToken: jest.fn() }))

      const freshService = require('../../services/userService')
      await expect(freshService.getUserByEmail('nobody@example.com')).rejects.toThrow('User not found')
    })
  })
})
