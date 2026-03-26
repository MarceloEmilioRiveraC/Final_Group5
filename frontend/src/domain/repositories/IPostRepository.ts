import type { Post } from "../entities/Post";

export interface IPostRepository {
  getAll(): Promise<Post[]>;
  create(post: Post): Promise<void>;
  delete(id: string): Promise<void>;
}