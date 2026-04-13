import type { IPostRepository } from '@domain/repositories/IPostRepository'

export const boughtPost = (repo: IPostRepository, id: string) =>
  repo.buy(id)
