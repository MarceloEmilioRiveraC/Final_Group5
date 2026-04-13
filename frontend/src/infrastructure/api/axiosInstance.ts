import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://api.escuelajs.co/api/v1/products',
  headers: { 'Content-Type': 'application/json' },
})

export default api