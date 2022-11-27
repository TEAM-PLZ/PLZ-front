import { GetServerSideProps } from 'next/types';
import React from 'react';
import { getVideoId } from 'utils/getVideoId';
import styles from './styles.module.css';

interface IProps {
  id: string;
  data: {
    videoId: string;
    url: string;
    thumbnailUrl: string;
    singer: string;
    songTitle: string;
    toNickname: string;
    message: string;
  };
}

const DetailPage = ({ id, data }: IProps) => {
  return (
    <section>
      <img className={styles.ring} src="/lp.png" />
    </section>
  );
};

/*

*/

export default DetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  try {
    const mockData = {
      videoId: getVideoId('https://www.youtube.com/watch?v=kxgj5af8zg4'),
      url: 'https://www.youtube.com/watch?v=kxgj5af8zg4',
      thumbnailUrl: 'https://i.ytimg.com/vi/kxgj5af8zg4/maxresdefault.jpg',
      singer: 'Weekend',
      songTitle: 'Out of Time',
      toNickname: 'Froggy',
      message: '가즈아',
    };

    return {
      props: {
        id,
        data: mockData,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
