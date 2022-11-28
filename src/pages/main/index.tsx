import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import { useState } from 'react';
import axios from 'axios';
import { getCookies } from 'cookies-next';
import Header from 'components/Header';
import { Dummy } from 'components/Template/type';
import Template from 'components/Template';
import NewArriveModal from 'components/NewArriveModal';
import PopupModal from 'components/PopupModal';
import useCopyClipBoard from 'hooks/useCopyClipBoard';
import { getAlbumList } from 'services/album';
import { IAlbum } from 'types/index';

import styles from './main.module.css';

const division = (array: any[], n: number) => {
  const newArray = [];
  for (let i = 0; i < array.length; i += n) {
    const slicedArray = array.slice(i, i + n);
    newArray.push([...slicedArray, ...Array(9 - slicedArray.length)]);
  }

  return newArray;
};

const dummy: Dummy[] = [
  { id: 1, albumSrc: '' },
  { id: 2, albumSrc: '/images/lp_image.png' },
  { id: 3, albumSrc: '' },
  { id: 4, albumSrc: '' },
  { id: 5, albumSrc: '' },
  { id: 6, albumSrc: '' },
  { id: 7, albumSrc: '' },
  { id: 8, albumSrc: '' },
  { id: 9, albumSrc: '' },
  { id: 10, albumSrc: '' },
  { id: 11, albumSrc: '' },
  { id: 12, albumSrc: '' },
  { id: 13, albumSrc: '' },
  { id: 14, albumSrc: '' },
  { id: 2, albumSrc: '' },
  { id: 16, albumSrc: '' },
  { id: 17, albumSrc: '' },
  { id: 18, albumSrc: '' },
];

interface IProps {
  data: IAlbum[];
}

const Main = ({ data }: IProps) => {
  const [isCopy, onCopy] = useCopyClipBoard();
  const [popup, setPopup] = useState({ status: '', message: '' });
  const [pageIndex, setPageIndex] = useState(0);
  const templateArray = division(dummy, 9);

  const onChangeCarousel = (now: any) => {
    setPageIndex(now);
  };

  const onClickShareBtn = async () => {
    try {
      await onCopy('복사가 되는지 확인해보자');
      setPopup({ status: 'success', message: '복사되었습니다' });
    } catch {
      setPopup({ status: 'error', message: '다시 시도해주세요' });
    }
  };

  return (
    <div className={styles.container}>
      <Header page="home" />
      <p className={`heading1 ${styles.headline}`}>
        <span className="block">새로운 플리가 도착했어요</span>
        <span className="block">바로 꺼내볼까요?</span>
      </p>
      <Carousel animation="slide" autoPlay={false} indicators={false} onChange={onChangeCarousel}>
        {templateArray.map((item, index) => (
          <div className={styles.albumList} key={index}>
            <Template array={item} />
          </div>
        ))}
      </Carousel>
      <div className={styles.sliderText}>
        <span>{pageIndex + 1} 번째 플리 보관함</span>
      </div>
      <div className={styles.bottomWrapper}>
        <p className="body2">
          “내 플리 보관함 링크”를 친구에게 공유하고 <br /> 나만의 플리를 채워보세요!
        </p>
        <button type="button" className={styles.shareButton} onClick={onClickShareBtn}>
          <Image src="/icons/link.svg" width="24" height="24" alt="link" />
          <span className="body1">내 플리 보관함 링크</span>
        </button>
      </div>
      {isCopy && popup.status && <PopupModal popup={popup} setPopup={setPopup} />}
      {/* <NewArriveModal/> */}
    </div>
  );
};

export default Main;

export const getServerSideProps: GetServerSideProps = async context => {
  const { token } = getCookies(context);
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const data = await getAlbumList();
    return { props: { data } };
  } catch (e) {
    return { notFound: true };
  }
};
