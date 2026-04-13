import api from '@infrastructure/api/axiosInstance';

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/users/login', { email, password });
  const { accessToken, refreshToken, user } = response.data;
  
  // Store tokens
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
  
  return { accessToken, refreshToken, user };
};