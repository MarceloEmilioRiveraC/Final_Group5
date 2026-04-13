import axios, { AxiosInstance } from 'axios'

const BASE_URL = process.env.API_URL || 'http://localhost:5000/api'

export const createApiClient = (): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    validateStatus: () => true,
  })
}

export interface TestContext {
  api: AxiosInstance
  response: any
  accessToken: string | null
  refreshToken: string | null
  userId: string | null
  postId: string | null
}

export const createTestContext = (): TestContext => ({
  api: createApiClient(),
  response: null,
  accessToken: null,
  refreshToken: null,
  userId: null,
  postId: null,
})
