import { api } from './api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/firebase/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post('/firebase/register', {
    email,
    password,
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
