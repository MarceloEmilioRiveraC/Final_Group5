import type { IPostRepository } from '@domain/repositories/IPostRepository'

export const sharePost = (repo: IPostRepository, id: string) =>
  repo.share(id)
