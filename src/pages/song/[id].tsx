import { GetServerSideProps } from 'next/types';
import { getVideoId } from 'utils/getVideoId';
import styles from './styles.module.css';
import Player from 'components/Player';
import axios from 'axios';
import { IAlbum } from 'types';



const DetailPage = ({ data }: IAlbum) => {
  return (
    <div className={styles.container}>
      <p className={styles.to_nickname}>From. {data.writerNickname}</p>
      <section className="w-64 h-64"></section>
      <h1 className={styles.song_title}>{data.title}</h1>
      <h2 className={styles.singer}>{data.singer}</h2>
      <div className={styles.message}>{data.message}</div>
      <Player videoId={getVideoId(data.url)} />
    </div>
  );
};

export default DetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  try {
    // const mockData = {
    //   videoId: getVideoId('https://www.youtube.com/watch?v=kxgj5af8zg4'),
    //   url: 'https://www.youtube.com/watch?v=kxgj5af8zg4',
    //   thumbnailUrl: 'https://i.ytimg.com/vi/kxgj5af8zg4/maxresdefault.jpg',
    //   singer: 'Weekend',
    //   songTitle: 'Out of Time',
    //   toNickname: 'Froggy',
    //   message: '가즈아',
    // };
    const data = await axios.get(`https://lp.weareboard.kr/api/v1/lp/${id}`).then(res => res.data);
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
