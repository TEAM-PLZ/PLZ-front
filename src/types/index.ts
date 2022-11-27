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
