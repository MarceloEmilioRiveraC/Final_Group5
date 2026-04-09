export interface Post {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  likes: number;
  userId: string;
}