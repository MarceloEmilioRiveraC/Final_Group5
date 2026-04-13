export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
  createdAt?: Date;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}