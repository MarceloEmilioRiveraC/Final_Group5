import { useState, useEffect } from 'react'
import type { Stats } from '@domain/entities/Stats'
import { getStats } from '@application/stats/getStats'

export const useStats = () => {
  const [stats,   setStats]   = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getStats()
      .then(setStats)
      .catch(() => setError('Failed to load stats'))
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading, error }
}
