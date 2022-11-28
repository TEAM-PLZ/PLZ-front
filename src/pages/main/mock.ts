import { IAlbum } from 'types';

const mockData: IAlbum[] = [
  {
    id: 1,
    title: '그대만이',
    singer: '장덕철',
    message: '이 노래를 듣고.. ~~ 뭐시기',
    url: 'https://www.youtube.com/watch?v=vfqxfsMPI50',
    coverImgPath: '/images/lp_image.jpeg',
    randomCoverPath: null,
    thumbnailImgPath: null,
    read: false,
    writer: { id: 3, name: '3' },
    writerNickname: '누구누구씨',
    receiver: { id: 4, name: '4' },
  },
  {
    id: 1,
    title: '그대만이',
    singer: '장덕철',
    message: '이 노래를 듣고.. ~~ 뭐시기',
    url: 'https://www.youtube.com/watch?v=vfqxfsMPI50',
    coverImgPath: '/images/lp_image.jpeg',
    randomCoverPath: null,
    thumbnailImgPath: null,
    read: false,
    writer: { id: 3, name: '3' },
    writerNickname: '누구누구씨',
    receiver: { id: 4, name: '4' },
  },
  {
    id: 1,
    title: '그대만이',
    singer: '장덕철',
    message: '이 노래를 듣고.. ~~ 뭐시기',
    url: 'https://www.youtube.com/watch?v=vfqxfsMPI50',
    coverImgPath: '/images/lp_image.png',
    randomCoverPath: null,
    thumbnailImgPath: null,
    read: true,
    writer: { id: 3, name: '3' },
    writerNickname: '누구누구씨',
    receiver: { id: 4, name: '4' },
  },
];

export default mockData;
