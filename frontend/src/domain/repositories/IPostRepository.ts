import type { Post } from '../entities/Post'

export interface IPostRepository {
  getAll():                        Promise<Post[]>
  create(data: Partial<Post>):     Promise<Post>
  delete(id: string):              Promise<void>
  like(id: string):                Promise<Post>
  share(id: string):               Promise<Post>
  buy(id: string):                 Promise<Post>
}