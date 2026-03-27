export interface Stats {
  totalPosts:    number
  totalUsers:    number
  totalLikes:    number
  topPost:       { _id: string; title: string; likes: number; imageUrl: string } | null
  postsPerMonth: { _id: string; count: number }[]
}