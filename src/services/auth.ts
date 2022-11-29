import { getCookie } from 'cookies-next';
import apiClient from './apiClient';

export const checkUser = async <T>() => {
  const token = getCookie('token');
  return apiClient<unknown, T>({
    method: 'get',
    url: '/api/v1/user',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const logoutKaKao = async () => {
  return apiClient({
    method: 'post',
    url: '/api/auth/kakao/logout',
  });
};
