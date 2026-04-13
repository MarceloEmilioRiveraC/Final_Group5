import { PostModel } from '../models/Posts'
import { UserModel } from '../models/User'

export const getStats = async () => {
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
    topPost: topPostAgg,
    postsPerMonth,
  }
}