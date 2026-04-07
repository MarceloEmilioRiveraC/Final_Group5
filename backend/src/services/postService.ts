import { PostModel } from '../models/Posts'

export const getAllPosts = async () => {
  return PostModel.find().populate('userId', 'email').sort({ createdAt: -1 })
}

export const createPost = async (data: {
  title: string
  description?: string
  imageUrl: string
  userId: string
}) => {
  const post = new PostModel(data)
  return post.save()
}

export const deletePost = async (id: string) => {
  const post = await PostModel.findByIdAndDelete(id)
  if (!post) throw new Error('Post not found')
  return post
}

export const likePost = async (id: string) => {
  const post = await PostModel.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  )
  if (!post) throw new Error('Post not found')
  return post
}