import apiClient from './apiClient';

export const checkUser = async <T>() => {
  return apiClient<unknown, T>({
    method: 'get',
    url: '/api/v1/user',
  });
};

export const logoutKaKao = async () => {
  return apiClient({
    method: 'post',
    url: '/api/auth/kakao/logout',
  });
};
