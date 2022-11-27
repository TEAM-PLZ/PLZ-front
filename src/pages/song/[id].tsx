import { GetServerSideProps } from 'next/types';
import Image from 'next/image';
import getVideoId from 'utils/getVideoId';
import styles from './styles.module.css';
import Player from 'components/Player';
import Header from 'components/header/Header';
import axios from 'axios';
import { IAlbum } from 'types';
import { useRecoilValue } from 'recoil';
import { playState } from 'stores/song';
import { getAlbum } from 'services/album';

const DetailPage = ({ data }: IAlbum) => {
  const isPlaying = useRecoilValue<boolean>(playState);

  return (
    <div className={styles.container}>
      <Header page="detail" href="/main" />
      <p className={`note ${styles.to_nickname}`}>From. {data.writerNickname}</p>
      <section className={styles.lp_section}>
        <div className="relative">
          <div className={styles.lp_cover}>
            <Image src={'/images/lp_cover.png'} fill sizes="100%" alt="cover" />
          </div>
          <div className={styles.lp_wrapper}>
            <div className={styles.center}>
              <Image src={'/images/lp_center.png'} fill sizes="100%" alt="center" />
            </div>
            <div
              className={`${styles.image} ${styles.rotate} ${
                isPlaying ? styles.rotate__running : styles.rotate__paused
              }`}
            >
              <Image
                src={'/images/lp_image.png'}
                fill
                sizes="100%"
                alt="image"
                className="rounded-full"
              />
            </div>
            <div
              className={`${styles.outline} ${styles.rotate} ${
                isPlaying ? styles.rotate__running : styles.rotate__paused
              }`}
            >
              <Image src={'/images/lp_outline.png'} fill sizes="100%" alt="middle" />
            </div>
          </div>
        </div>
      </section>
      <h1 className={`heading1 ${styles.title}`}>{data.title}</h1>
      <h2 className={`bar1 ${styles.singer}`}>{data.singer}</h2>
      <div className={styles.message_container}>
        <p className={`note ${styles.message}`}>{data.message}</p>
      </div>
      <Player videoId={getVideoId(data.url)} />
    </div>
  );
};

export default DetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  try {
    const data = await getAlbum(id);

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
