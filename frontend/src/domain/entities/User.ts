export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}