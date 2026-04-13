import { Response } from 'express'
import * as userController from '../../controllers/userController'
import * as userService from '../../services/userService'
import { AuthRequest } from '../../middleware/auth'

jest.mock('../../services/userService')

const mockRes = (): Partial<Response> => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
})

describe('UserController', () => {
  afterEach(() => jest.clearAllMocks())

  // ---------- register ----------

  describe('register', () => {
    it('should register a user and return 201', async () => {
      const userData = { email: 'new@test.com', password: 'pass123', name: 'New User' }
      const createdUser = { _id: 'u1', email: 'new@test.com', name: 'New User', role: 'customer' };
      (userService.registerUser as jest.Mock).mockResolvedValue(createdUser)

      const req = { body: userData } as any
      const res = mockRes()

      await userController.register(req, res as Response)

      expect(userService.registerUser).toHaveBeenCalledWith(userData)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: createdUser,
      })
    })

    it('should return 400 if required fields are missing', async () => {
      const req = { body: { email: 'test@test.com' } } as any
      const res = mockRes()

      await userController.register(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Email, password, and name are required',
      })
    })

    it('should return 400 if service throws', async () => {
      (userService.registerUser as jest.Mock).mockRejectedValue(new Error('Email already registered'))

      const req = { body: { email: 'dup@test.com', password: 'pass', name: 'Dup' } } as any
      const res = mockRes()

      await userController.register(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Email already registered' })
    })
  })

  // ---------- login ----------

  describe('login', () => {
    it('should login and return tokens', async () => {
      const loginResult = {
        accessToken: 'at',
        refreshToken: 'rt',
        user: { _id: 'u1', email: 'test@test.com', name: 'Test', role: 'customer' },
      };
      (userService.loginUser as jest.Mock).mockResolvedValue(loginResult)

      const req = { body: { email: 'test@test.com', password: 'pass123' } } as any
      const res = mockRes()

      await userController.login(req, res as Response)

      expect(userService.loginUser).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'pass123',
      })
      expect(res.json).toHaveBeenCalledWith(loginResult)
    })

    it('should return 400 if email or password missing', async () => {
      const req = { body: { email: 'test@test.com' } } as any
      const res = mockRes()

      await userController.login(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(400)
    })

    it('should return 401 on invalid credentials', async () => {
      (userService.loginUser as jest.Mock).mockRejectedValue(new Error('Invalid email or password'))

      const req = { body: { email: 'test@test.com', password: 'wrong' } } as any
      const res = mockRes()

      await userController.login(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(401)
    })
  })

  // ---------- refreshToken ----------

  describe('refreshToken', () => {
    it('should return a new access token', async () => {
      (userService.refreshAccessToken as jest.Mock).mockReturnValue({
        accessToken: 'new-at',
      })

      const req = { body: { refreshToken: 'valid-rt' } } as any
      const res = mockRes()

      await userController.refreshToken(req, res as Response)

      expect(userService.refreshAccessToken).toHaveBeenCalledWith('valid-rt')
      expect(res.json).toHaveBeenCalledWith({ accessToken: 'new-at' })
    })

    it('should return 400 if refresh token is missing', async () => {
      const req = { body: {} } as any
      const res = mockRes()

      await userController.refreshToken(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(400)
    })
  })

  // ---------- getProfile ----------

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const user = { _id: 'u1', email: 'test@test.com', name: 'Test', role: 'customer' };
      (userService.getUserByEmail as jest.Mock).mockResolvedValue(user)

      const req = { user: { email: 'test@test.com' } } as unknown as AuthRequest
      const res = mockRes()

      await userController.getProfile(req, res as Response)

      expect(userService.getUserByEmail).toHaveBeenCalledWith('test@test.com')
      expect(res.json).toHaveBeenCalledWith({
        message: 'User profile retrieved',
        user,
      })
    })

    it('should return 404 if user not found', async () => {
      (userService.getUserByEmail as jest.Mock).mockRejectedValue(new Error('User not found'))

      const req = { user: { email: 'gone@test.com' } } as unknown as AuthRequest
      const res = mockRes()

      await userController.getProfile(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  // ---------- logout ----------

  describe('logout', () => {
    it('should return 204 on successful logout', async () => {
      const req = { user: { email: 'test@test.com' } } as unknown as AuthRequest
      const res = mockRes()

      await userController.logout(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(204)
    })
  })
})
