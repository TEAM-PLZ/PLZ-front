import apiClient from 'services/apiClient';

export const sendAlbum = (formData: FormData) => {
  return apiClient({
    method: 'post',
    url: 'api/v1/lp',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAlbum = (id: unknown) => {
  return apiClient({
    method: 'get',
    url: `https://lp.weareboard.kr/api/v1/lp/${id}`,
  });
};

export const getAlbumList = () => {
  return apiClient({
    method: 'get',
    url: '/api/v1/lp/my',
  });
};
