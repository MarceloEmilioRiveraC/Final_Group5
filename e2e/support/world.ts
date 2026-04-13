import { World, setWorldConstructor } from '@cucumber/cucumber'
import axios, { AxiosInstance } from 'axios'

const BASE_URL = process.env.API_URL || 'http://localhost:5000/api'

export class TestWorld extends World {
  api: AxiosInstance
  response: any
  accessToken: string | null
  refreshToken: string | null
  userId: string | null
  postId: string | null
  previousLikes: number
  previousShares: number
  previousBuys: number

  constructor(options: any) {
    super(options)
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true,
    })
    this.response = null
    this.accessToken = null
    this.refreshToken = null
    this.userId = null
    this.postId = null
    this.previousLikes = 0
    this.previousShares = 0
    this.previousBuys = 0
  }
}

setWorldConstructor(TestWorld)
