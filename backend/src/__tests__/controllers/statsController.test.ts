import { Request, Response } from 'express'
import * as statsController from '../../controllers/statsController'
import * as statsService from '../../services/statsService'
jest.mock('../../services/statsService')

const mockRes = (): Partial<Response> => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
})

describe('StatsController', () => {
  afterEach(() => jest.clearAllMocks())

  describe('getStats', () => {
    it('should return stats with status 200', async () => {
      const stats = {
        totalPosts: 10,
        totalUsers: 5,
        totalLikes: 50,
        totalShares: 20,
        totalBuys: 15,
        topPost: { title: 'Top', likes: 25, imageUrl: 'http://img.com/top.jpg' },
        postsPerMonth: [{ _id: '2026-04', count: 5 }],
      };
      (statsService.getStats as jest.Mock).mockResolvedValue(stats)

      const req = {} as Request
      const res = mockRes()

      await statsController.getStats(req, res as Response)

      expect(statsService.getStats).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith(stats)
    })

    it('should return 500 on service error', async () => {
      (statsService.getStats as jest.Mock).mockRejectedValue(new Error('Stats error'))

      const req = {} as Request
      const res = mockRes()

      await statsController.getStats(req, res as Response)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Stats error' })
    })
  })
})
