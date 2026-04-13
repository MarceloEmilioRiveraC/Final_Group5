jest.mock('@infrastructure/api/axiosInstance', () => ({
  api: { get: jest.fn(), post: jest.fn(), put: jest.fn(), patch: jest.fn(), delete: jest.fn() },
  default: { get: jest.fn(), post: jest.fn(), put: jest.fn(), patch: jest.fn(), delete: jest.fn() },
}))
jest.mock('@infrastructure/services/authService')

import * as authUseCases from '@application/users/authUseCases'
import * as authService from '@infrastructure/services/authService'

describe('Auth Use Cases', () => {
  afterEach(() => jest.clearAllMocks())

  describe('login', () => {
    it('should call authService.loginUser with email and password', async () => {
      const mockResponse = {
        accessToken: 'at',
        refreshToken: 'rt',
        user: { _id: 'u1', email: 'test@test.com', name: 'Test', role: 'customer' as const },
      };
      (authService.loginUser as jest.Mock).mockResolvedValue(mockResponse)

      const result = await authUseCases.login('test@test.com', 'password123')

      expect(authService.loginUser).toHaveBeenCalledWith('test@test.com', 'password123')
      expect(result).toEqual(mockResponse)
    })

    it('should propagate errors from authService', async () => {
      (authService.loginUser as jest.Mock).mockRejectedValue(new Error('Login failed'))

      await expect(authUseCases.login('bad@test.com', 'wrong')).rejects.toThrow('Login failed')
    })
  })

  describe('register', () => {
    it('should call authService.registerUser with correct params', async () => {
      const mockResponse = {
        user: { _id: 'u1', email: 'new@test.com', name: 'New', role: 'customer' as const },
      };
      (authService.registerUser as jest.Mock).mockResolvedValue(mockResponse)

      const result = await authUseCases.register('new@test.com', 'pass123', 'New', 'customer')

      expect(authService.registerUser).toHaveBeenCalledWith('new@test.com', 'pass123', 'New', 'customer')
      expect(result).toEqual(mockResponse)
    })

    it('should default role to customer', async () => {
      (authService.registerUser as jest.Mock).mockResolvedValue({ user: {} })

      await authUseCases.register('new@test.com', 'pass123', 'New')

      expect(authService.registerUser).toHaveBeenCalledWith('new@test.com', 'pass123', 'New', 'customer')
    })
  })

  describe('getProfile', () => {
    it('should call authService.getProfile', async () => {
      const mockProfile = {
        user: { _id: 'u1', email: 'test@test.com', name: 'Test', role: 'customer' as const },
      };
      (authService.getProfile as jest.Mock).mockResolvedValue(mockProfile)

      const result = await authUseCases.getProfile()

      expect(authService.getProfile).toHaveBeenCalled()
      expect(result).toEqual(mockProfile)
    })
  })

  describe('logout', () => {
    it('should call authService.logout', async () => {
      (authService.logout as jest.Mock).mockResolvedValue(undefined)

      await authUseCases.logout()

      expect(authService.logout).toHaveBeenCalled()
    })
  })

  describe('refreshToken', () => {
    it('should call authService.refreshAccessToken', async () => {
      (authService.refreshAccessToken as jest.Mock).mockResolvedValue({
        accessToken: 'new-at',
      })

      const result = await authUseCases.refreshToken('old-rt')

      expect(authService.refreshAccessToken).toHaveBeenCalledWith('old-rt')
      expect(result).toEqual({ accessToken: 'new-at' })
    })
  })
})
