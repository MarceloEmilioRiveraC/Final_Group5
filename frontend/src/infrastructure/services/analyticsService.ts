import type { Stats } from '@domain/entities/Stats'
import api from '../api/axiosInstance'

export const fetchStats = async (): Promise<Stats> => {
  const { data } = await api.get('/stats')
  return data
}