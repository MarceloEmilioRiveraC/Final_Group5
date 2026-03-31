import { api } from '@infrastructure/api/axiosInstance';
import type { User } from '@domain/entities/User';

export const loginUser = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};
