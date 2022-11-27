import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const apiClient = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config: any) => {
  const token = getCookie('token');
  if (config && token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  res => res.data,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default apiClient;

export const isAxiosError = <E>(err: unknown | AxiosError<E>): err is AxiosError<E> => {
  return axios.isAxiosError(err);
};
