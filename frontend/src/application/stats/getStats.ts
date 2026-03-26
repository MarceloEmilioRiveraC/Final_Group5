import type { IPostRepository } from "../../domain/repositories/IPostRepository";

export const getStats = async (repository: IPostRepository) => {
  const posts = await repository.getAll();

  const totalPosts = posts.length;
  const totalLikes = posts.reduce((acc, p) => acc + p.likes, 0);

  return {
    totalPosts,
    totalLikes,
  };
};