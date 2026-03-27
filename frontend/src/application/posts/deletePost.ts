import type { IPostRepository } from '@domain/repositories/IPostRepository'

export const deletePost = (repo: IPostRepository, id: string) =>
  repo.delete(id)