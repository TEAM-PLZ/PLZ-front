import apiClient from './apiClient';

export const checkUser = async <T>() => {
  const result = await apiClient<any, T>({
    method: 'get',
    url: '/api/v1/user',
  });

  return result;
};
