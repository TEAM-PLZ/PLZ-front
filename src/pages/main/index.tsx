import Image from 'next/image';
import Album from 'components/Album';
import Header from 'components/header/Header';
import NewArriveModal from 'components/NewArriveModal';
import styles from './main.module.css';
import Template from 'components/Album/Template';
import { useEffect, useState } from 'react';

const Main = () => {
  type Dummy = {
    albumSrc: string;
  }[];

  const dummy: Dummy = [
    { albumSrc: '/icons/empty_lp.svg' },
    { albumSrc: '/icons/empty_lp.svg' },
    { albumSrc: '/icons/empty_lp.svg' },
    { albumSrc: '/icons/empty_lp.svg' },
    { albumSrc: '/icons/empty_lp.svg' },
    { albumSrc: '/icons/empty_lp.svg' },
    { albumSrc: '/icons/empty_lp.svg' },
    { albumSrc: '/icons/empty_lp.svg' },
    { albumSrc: '/icons/empty_lp.svg' },
  ];
  const [albumList, setAlbumList] = useState<Dummy[]>([]);

  const chun = (data: Dummy = [], size = 1) => {
    const arr: Dummy[] = [];
    for (let i = 0; i < data.length; i += size) {
      arr.push(data.slice(i, i + size));
    }

    return arr;
  };

  useEffect(() => {
    setAlbumList(chun(dummy, 3));
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <p className={`heading1 ${styles.headline}`}>
        <span>새로운 플리가 도착했어요</span>
        <span>바로 꺼내볼까요?</span>
      </p>

      <div className={styles.albumList}>
        {albumList.map((_, idx: number) => {
          return (
            <>
              <Template key={idx} list={albumList[0]} />
              <Template key={idx} list={albumList[1]} />
              <Template key={idx} list={albumList[2]} />
            </>
          );
        })}
      </div>

      {/* <NewArriveModal/> */}
    </div>
  );
};

export default Main;
