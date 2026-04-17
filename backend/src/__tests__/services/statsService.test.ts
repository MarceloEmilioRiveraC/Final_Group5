import { jest } from '@jest/globals'
import { describe, it, expect, afterEach } from '@jest/globals'
import { StatsModel } from '../../models/Stats'
import * as statsService from '../../services/statsService'
jest.mock('../../models/Stats')
// Mock all Mongoose models
jest.mock('../../models/Posts', () => ({
  PostModel: {
    countDocuments: jest.fn(),
    aggregate: jest.fn(),
    findOne: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        select: jest.fn(),
      }),
    }),
  },
}))

jest.mock('../../models/User', () => ({
  UserModel: {
    countDocuments: jest.fn(),
  },
}))

jest.mock('../../models/Stats', () => {
  const mockSave = jest.fn().mockResolvedValue(undefined)
  return {
    StatsModel: Object.assign(
      jest.fn().mockImplementation((data: any) => ({
        ...data,
        totalLikes: 0,
        totalShares: 0,
        totalBuys: 0,
        save: mockSave,
      })),
      {
        findOne: jest.fn(),
      }
    ),
  }
})

describe('StatsService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // ---------- getStats ----------

  describe('getStats', () => {
    it('should aggregate and return platform statistics', async () => {
      // Reset modules for clean import
      jest.resetModules()

      jest.mock('../../models/Posts', () => ({
        PostModel: {
          countDocuments: jest.fn().mockResolvedValue(10),
          aggregate: jest.fn()
            .mockResolvedValueOnce([{ _id: null, total: 50 }])
            .mockResolvedValueOnce([{ _id: '2026-04', count: 5 }]),
          findOne: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              select: jest.fn().mockResolvedValue({
                title: 'Top Post',
                likes: 25,
                imageUrl: 'http://img.com/top.jpg',
              }),
            }),
          }),
        },
      }))

      jest.mock('../../models/User', () => ({
        UserModel: { countDocuments: jest.fn().mockResolvedValue(5) },
      }))

      jest.mock('../../models/Stats', () => ({
        StatsModel: Object.assign(jest.fn(), {
          findOne: jest.fn().mockResolvedValue({
            totalShares: 20,
            totalBuys: 15,
          }),
        }),
      }))

      const freshStatsService = require('../../services/statsService')
      const result = await freshStatsService.getStats()

      expect(result.totalPosts).toBe(10)
      expect(result.totalUsers).toBe(5)
      expect(result.totalLikes).toBe(50)
      expect(result.totalShares).toBe(20)
      expect(result.totalBuys).toBe(15)
      expect(result.topPost).toBeDefined()
      expect(result.postsPerMonth).toBeDefined()
    })

    it('should return 0 for likes when no aggregate result', async () => {
      jest.resetModules()

      jest.mock('../../models/Posts', () => ({
        PostModel: {
          countDocuments: jest.fn().mockResolvedValue(0),
          aggregate: jest.fn()
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([]),
          findOne: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              select: jest.fn().mockResolvedValue(null),
            }),
          }),
        },
      }))

      jest.mock('../../models/User', () => ({
        UserModel: { countDocuments: jest.fn().mockResolvedValue(0) },
      }))

      jest.mock('../../models/Stats', () => ({
        StatsModel: Object.assign(jest.fn(), {
          findOne: jest.fn().mockResolvedValue(null),
        }),
      }))

      const freshStatsService = require('../../services/statsService')
      const result = await freshStatsService.getStats()

      expect(result.totalLikes).toBe(0)
      expect(result.totalShares).toBe(0)
      expect(result.totalBuys).toBe(0)
    })
  })

  // ---------- incrementLikes ----------

  describe('incrementLikes', () => {
    it('should increment totalLikes on existing monthly stats', async () => {
      jest.resetModules()
      const mockSave = jest.fn().mockResolvedValue(undefined)
      const mockStats = { totalLikes: 5, totalShares: 0, totalBuys: 0, save: mockSave }

      jest.mock('../../models/Posts', () => ({ PostModel: {} }))
      jest.mock('../../models/User', () => ({ UserModel: {} }))
      jest.mock('../../models/Stats', () => ({
        StatsModel: Object.assign(jest.fn(), {
          findOne: jest.fn().mockResolvedValue(mockStats),
        }),
      }))

      const freshStatsService = require('../../services/statsService')
      await freshStatsService.incrementLikes()

      expect(mockStats.totalLikes).toBe(6)
      expect(mockSave).toHaveBeenCalled()
    })

    it('should create new monthly stats if none exist', async () => {
      jest.resetModules()
      const mockSave = jest.fn().mockResolvedValue(undefined)

      jest.mock('../../models/Posts', () => ({ PostModel: {} }))
      jest.mock('../../models/User', () => ({ UserModel: {} }))
      jest.mock('../../models/Stats', () => ({
        StatsModel: Object.assign(
          jest.fn().mockImplementation((data: any) => ({
            ...data,
            totalLikes: 0,
            totalShares: 0,
            totalBuys: 0,
            save: mockSave,
          })),
          { findOne: jest.fn().mockResolvedValue(null) }
        ),
      }))

      const freshStatsService = require('../../services/statsService')
      await freshStatsService.incrementLikes()

      expect(mockSave).toHaveBeenCalled()
    })
  })

  // ---------- incrementShares ----------

  describe('incrementShares', () => {
    it('should increment totalShares', async () => {
      jest.resetModules()
      const mockSave = jest.fn().mockResolvedValue(undefined)
      const mockStats = { totalLikes: 0, totalShares: 3, totalBuys: 0, save: mockSave }

      jest.mock('../../models/Posts', () => ({ PostModel: {} }))
      jest.mock('../../models/User', () => ({ UserModel: {} }))
      jest.mock('../../models/Stats', () => ({
        StatsModel: Object.assign(jest.fn(), {
          findOne: jest.fn().mockResolvedValue(mockStats),
        }),
      }))

      const freshStatsService = require('../../services/statsService')
      await freshStatsService.incrementShares()

      expect(mockStats.totalShares).toBe(4)
      expect(mockSave).toHaveBeenCalled()
    })
  })

  // ---------- incrementBuys ----------

  describe('incrementBuys', () => {
    it('should increment totalBuys', async () => {
      jest.resetModules()
      const mockSave = jest.fn().mockResolvedValue(undefined)
      const mockStats = { totalLikes: 0, totalShares: 0, totalBuys: 7, save: mockSave }

      jest.mock('../../models/Posts', () => ({ PostModel: {} }))
      jest.mock('../../models/User', () => ({ UserModel: {} }))
      jest.mock('../../models/Stats', () => ({
        StatsModel: Object.assign(jest.fn(), {
          findOne: jest.fn().mockResolvedValue(mockStats),
        }),
      }))

      const freshStatsService = require('../../services/statsService')
      await freshStatsService.incrementBuys()

      expect(mockStats.totalBuys).toBe(8)
      expect(mockSave).toHaveBeenCalled()
    })
  })
})
