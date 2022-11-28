import apiClient from './apiClient';

export const checkUser = <T>() => {
  return apiClient<any, T>({
    method: 'get',
    url: '/api/v1/user',
  });
};

export const logoutKaKao = () => {
  return apiClient({
    method: 'post',
    url: '/api/auth/kakao/logout',
  });
};
