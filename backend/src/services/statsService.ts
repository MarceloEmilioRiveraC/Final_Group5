import { PostModel } from '../models/Posts'
import { UserModel } from '../models/User'
import { StatsModel } from '../models/Stats'

const getCurrentMonth = () => {
  const date = new Date()
  return date.toISOString().slice(0, 7)
}

const getOrCreateMonthlyStats = async () => {
  const month = getCurrentMonth()
  let stats = await StatsModel.findOne({ month })
  if (!stats) {
    stats = new StatsModel({ month })
    await stats.save()
  }
  return stats
}

export const getStats = async () => {
  const month = getCurrentMonth()
  const monthlyStats = await StatsModel.findOne({ month })
  
  const [totalPosts, totalUsers, likesAgg, topPostAgg, postsPerMonth] = await Promise.all([
    PostModel.countDocuments(),
    UserModel.countDocuments(),
    PostModel.aggregate([{ $group: { _id: null, total: { $sum: '$likes' } } }]),
    PostModel.findOne().sort({ likes: -1 }).select('title likes imageUrl'),
    PostModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 12 },
    ]),
  ])

  return {
    totalPosts,
    totalUsers,
    totalLikes: likesAgg[0]?.total ?? 0,
    totalShares: monthlyStats?.totalShares ?? 0,
    totalBuys: monthlyStats?.totalBuys ?? 0,
    topPost: topPostAgg,
    postsPerMonth,
  }
}

export const incrementLikes = async () => {
  const stats = await getOrCreateMonthlyStats()
  stats.totalLikes += 1
  await stats.save()
}

export const incrementShares = async () => {
  const stats = await getOrCreateMonthlyStats()
  stats.totalShares += 1
  await stats.save()
}

export const incrementBuys = async () => {
  const stats = await getOrCreateMonthlyStats()
  stats.totalBuys += 1
  await stats.save()
}