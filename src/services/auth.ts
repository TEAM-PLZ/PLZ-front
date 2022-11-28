import apiClient from './apiClient';

export const checkUser = async <T>() => {
  return await apiClient<any, T>({
    method: 'get',
    url: '/api/v1/user',
  });
};

export const logoutKaKao = async () => {
  return await apiClient({
    method: 'post',
    url: '/api/auth/kakao/logout',
  });
};
