export interface IAlbum {
  data: {
    id: number;
    imgPath: string;
    message: string;
    read: false;
    receiver: {
      id: number;
      name: string;
    };
    singer: string;
    title: string;
    url: string;
    writer: {
      id: number;
      name: string;
    };
    writerNickname: string;
  };
}

export interface IYoutube {
  author_name: string;
  author_url: string;
  height: number;
  html: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_url: string;
  thumbnail_width: number;
  title: string;
  type: string;
  version: string;
  width: number;
}