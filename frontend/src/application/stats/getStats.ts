import { fetchStats } from '@infrastructure/services/analyticsService'

export const getStats = () => fetchStats()