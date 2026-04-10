import type { IPostRepository } from '@domain/repositories/IPostRepository'
import type { Post } from '@domain/entities/Post'
import { api } from '../api/axiosInstance'

export class PostRepository implements IPostRepository {
  async getAll(): Promise<Post[]> {
    const { data } = await api.get('/posts')
    return data
  }

  async create(post: Partial<Post>): Promise<Post> {
    const { data } = await api.post('/posts', post)
    return data
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/posts/${id}`)
  }

  async like(id: string): Promise<Post> {
    const { data } = await api.patch(`/posts/${id}/like`)
    return data
  }

  async share(id: string): Promise<Post> {
    const { data } = await api.patch(`/posts/${id}/share`)
    return data
  }

  async buy(id: string): Promise<Post> {
    const { data } = await api.patch(`/posts/${id}/buy`)
    return data
  }
}