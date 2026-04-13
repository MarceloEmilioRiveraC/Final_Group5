import * as authService from '@infrastructure/services/authService'
import { api } from '@infrastructure/api/axiosInstance'

jest.mock('@infrastructure/api/axiosInstance', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}))

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value }),
    removeItem: jest.fn((key: string) => { delete store[key] }),
    clear: jest.fn(() => { store = {} }),
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks()
    localStorageMock.clear()
  })

  describe('loginUser', () => {
    it('should POST /users/login and return auth response', async () => {
      const mockResponse = {
        accessToken: 'at',
        refreshToken: 'rt',
        user: { _id: 'u1', email: 'test@test.com', name: 'Test', role: 'customer' },
      };
      (api.post as jest.Mock).mockResolvedValue({ data: mockResponse })

      const result = await authService.loginUser('test@test.com', 'password')

      expect(api.post).toHaveBeenCalledWith('/users/login', {
        email: 'test@test.com',
        password: 'password',
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('registerUser', () => {
    it('should POST /users/register with user data', async () => {
      const mockResponse = { user: { _id: 'u1', email: 'new@test.com', name: 'New', role: 'customer' } };
      (api.post as jest.Mock).mockResolvedValue({ data: mockResponse })

      const result = await authService.registerUser('new@test.com', 'pass', 'New', 'customer')

      expect(api.post).toHaveBeenCalledWith('/users/register', {
        email: 'new@test.com',
        password: 'pass',
        name: 'New',
        role: 'customer',
      })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getProfile', () => {
    it('should GET /users/profile', async () => {
      const mockProfile = { user: { _id: 'u1', email: 'test@test.com', name: 'Test', role: 'customer' } };
      (api.get as jest.Mock).mockResolvedValue({ data: mockProfile })

      const result = await authService.getProfile()

      expect(api.get).toHaveBeenCalledWith('/users/profile')
      expect(result).toEqual(mockProfile)
    })
  })

  describe('refreshAccessToken', () => {
    it('should POST /users/refresh-token', async () => {
      (api.post as jest.Mock).mockResolvedValue({ data: { accessToken: 'new-at' } })

      const result = await authService.refreshAccessToken('old-rt')

      expect(api.post).toHaveBeenCalledWith('/users/refresh-token', { refreshToken: 'old-rt' })
      expect(result).toEqual({ accessToken: 'new-at' })
    })
  })

  describe('logout', () => {
    it('should POST /users/logout and clear localStorage', async () => {
      localStorageMock.setItem('accessToken', 'at')
      localStorageMock.setItem('refreshToken', 'rt')
      localStorageMock.setItem('user', '{}');
      (api.post as jest.Mock).mockResolvedValue({})

      await authService.logout()

      expect(api.post).toHaveBeenCalledWith('/users/logout')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('accessToken')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('refreshToken')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
    })

    it('should clear localStorage even if API call fails', async () => {
      (api.post as jest.Mock).mockRejectedValue(new Error('Network error'))

      await authService.logout().catch(() => {})

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('accessToken')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('refreshToken')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user')
    })
  })
})
