export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  likes: number;
  shared: number;
  bought: number;
  userId: string;
}