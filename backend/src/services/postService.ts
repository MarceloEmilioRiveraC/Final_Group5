import { PostModel } from '../models/Posts'
import * as statsService from './statsService'


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
  
  // Increment stats
  await statsService.incrementLikes()
  
  return post
}

export const sharePost = async (id: string) => {
  const post = await PostModel.findByIdAndUpdate(
    id,
    { $inc: { shared: 1 } },
    { new: true }
  )
  if (!post) throw new Error('Post not found')
  
  // Increment stats
  await statsService.incrementShares()
  
  return post
}


export const boughtPost = async (id: string) => {
  const post = await PostModel.findByIdAndUpdate(
    id,
    { $inc: { bought: 1 } },
    { new: true }
  )
  if (!post) throw new Error('Post not found')
  
  // Increment stats
  await statsService.incrementBuys()
  
  return post
}
