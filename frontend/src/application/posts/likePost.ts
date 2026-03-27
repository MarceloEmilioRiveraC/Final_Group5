import type { IPostRepository } from '@domain/repositories/IPostRepository'

export const likePost = (repo: IPostRepository, id: string) =>
  repo.like(id)