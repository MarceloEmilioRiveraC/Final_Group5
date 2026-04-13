jest.mock('@infrastructure/api/axiosInstance', () => ({
  api: { get: jest.fn(), post: jest.fn(), put: jest.fn(), patch: jest.fn(), delete: jest.fn() },
  default: { get: jest.fn(), post: jest.fn(), put: jest.fn(), patch: jest.fn(), delete: jest.fn() },
}))
jest.mock('@infrastructure/services/analyticsService')

import { getStats } from '@application/stats/getStats'
import { fetchStats } from '@infrastructure/services/analyticsService'

describe('getStats Use Case', () => {
  afterEach(() => jest.clearAllMocks())

  it('should call fetchStats and return stats data', async () => {
    const mockStats = {
      totalPosts: 10,
      totalUsers: 5,
      totalLikes: 50,
      totalShares: 20,
      totalBuys: 15,
      topPost: { _id: 'p1', title: 'Top', likes: 25, imageUrl: 'http://img.com/top.jpg' },
      postsPerMonth: [{ _id: '2026-04', count: 5 }],
    };
    (fetchStats as jest.Mock).mockResolvedValue(mockStats)

    const result = await getStats()

    expect(fetchStats).toHaveBeenCalled()
    expect(result).toEqual(mockStats)
  })

  it('should propagate errors from fetchStats', async () => {
    (fetchStats as jest.Mock).mockRejectedValue(new Error('Network error'))

    await expect(getStats()).rejects.toThrow('Network error')
  })
})
