import type { IPostRepository } from "../../domain/repositories/IPostRepository";

export const getPosts = async (repository: IPostRepository) => {
  return await repository.getAll();
};