import { GetServerSideProps } from 'next/types';
import Image from 'next/image';
import getVideoId from 'utils/getVideoId';
import styles from './styles.module.css';
import Player from 'components/Player';
import Header from 'components/Header';
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
      <div className={`note ${styles.message_container}`}>
        플레이리스트란, 음원이나 동영상 등을 미디어 플레이어를 통해 순서대로 재생할 수 있도록 모아
        놓은 목록을 말하는 것으로, 미디어 플레이어에 따라 반복, 임의 재생(셔플)등의 기능이 있기도
        하다. 줄여서 '플리'라고 부르기도 한다.
        <Image
          src={'/images/sticker.png'}
          width={140}
          height={48}
          alt="sticker"
          className={styles.message_sticker}
        />
      </div>
      <Player videoId={getVideoId(data.url)} />
    </div>
  );
};

export default DetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { id } = query;
  const cookie = req ? req.headers.cookie : '';
  console.log(cookie, '쿠키');
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
