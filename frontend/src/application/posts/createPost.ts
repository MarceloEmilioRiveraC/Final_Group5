import type { IPostRepository } from '@domain/repositories/IPostRepository'
import type { Post } from '@domain/entities/Post'

export const createPost = (repo: IPostRepository, data: Partial<Post>) =>
  repo.create(data)