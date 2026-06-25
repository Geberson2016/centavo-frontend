import axios from 'axios';
import { clearAuth } from '../utils/auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const PUBLIC_ROUTES = ['/users/login', '/users/register'];

api.interceptors.request.use((config) => {
  const isPublic = PUBLIC_ROUTES.some((route) => config.url?.includes(route));

  if (!isPublic) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
