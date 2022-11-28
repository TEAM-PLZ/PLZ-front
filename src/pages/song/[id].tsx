/* eslint-disable no-nested-ternary */
import { GetServerSideProps } from 'next/types';
import Image from 'next/image';
import getVideoId from 'utils/getVideoId';
import Player from 'components/Player';
import Header from 'components/Header';
import LpCover from 'components/LpCover';
import { IAlbum } from 'types';
import { getAlbum } from 'services/album';
import styles from './styles.module.css';

const coverImgSize = 'w-[264px] h-[264px] max-[375px]:w-[180px] max-[375px]:h-[180px]';
const thumbnailImgSize = 'w-[86px] h-[86px] max-[375px]:w-[65px] max-[375px]:h-[65px]';
const lpSize = {
  wrapper: 'w-[248px] h-[248px] max-[375px]:w-[180px] max-[375px]:h-[180px]',
  outline: 'w-full h-full',
  center: 'w-[12px] h-[12px]',
};

interface IProps {
  data: IAlbum;
}

const DetailPage = ({ data }: IProps) => {
  return (
    <div className={styles.container}>
      <Header page="detail" href="/main" />
      <p className={`note ${styles.to_nickname}`}>From. {data.writerNickname}</p>
      <section className={styles.lp_section}>
        <LpCover
          coverImgPath={
            data.coverImgPath
              ? `${process.env.NEXT_PUBLIC_BASE_URL}/${data.coverImgPath}`
              : data.randomCoverPath
              ? data.randomCoverPath
              : '/images/image1.png'
          }
          thumbnailImgPath={data.thumbnailImgPath ? data.thumbnailImgPath : '/images/image1.png'}
          coverPosition="left"
          coverImgSize={coverImgSize}
          thumbnailImgSize={thumbnailImgSize}
          lpSize={lpSize}
        />
      </section>
      <h1 className={`heading1 ${styles.title}`}>{data.title}</h1>
      <h2 className={`bar1 ${styles.singer}`}>{data.singer}</h2>
      <div className={`note ${styles.message_container}`}>
        <div className="w-full h-full overflow-y-scroll">{data.message}</div>
        <Image
          src="/images/sticker.png"
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
