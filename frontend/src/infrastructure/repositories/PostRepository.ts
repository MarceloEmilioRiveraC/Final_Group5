import type { IPostRepository } from "../../domain/repositories/IPostRepository";
import type { Post } from "../../domain/entities/Post";

export class PostRepository implements IPostRepository {
  async getAll(): Promise<Post[]> {
  return [
    {
      id: "1",
      title: "Streetwear",
      description: "Oversized fit",
      imageUrl: "",
      createdAt: new Date(),
      likes: 10,
      userId: "user1"
    },
    {
      id: "2",
      title: "Minimal Outfit",
      description: "Clean look",
      imageUrl: "",
      createdAt: new Date(),
      likes: 25,
      userId: "user2"
    }
  ];
}

  async create(post: Post): Promise<void> {
    console.log("Creating post", post);
  }

  async delete(id: string): Promise<void> {
    console.log("Deleting post", id);
  }
}

