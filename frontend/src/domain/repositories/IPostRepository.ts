import type { Post } from '../entities/Post'

export interface IPostRepository {
  getAll():                        Promise<Post[]>
  create(data: Partial<Post>):     Promise<Post>
  delete(id: string):              Promise<void>
  like(id: string):                Promise<Post>
}