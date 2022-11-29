import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import { useState } from 'react';
import axios from 'axios';
import { getCookies } from 'cookies-next';
import Header from 'components/Header';
import Template from 'components/Template';
import NewArriveModal from 'components/NewArriveModal';
import PopupModal from 'components/PopupModal';
import useCopyClipBoard from 'hooks/useCopyClipBoard';
import { getAlbumList } from 'services/album';
import { IAlbum } from 'types/index';
import { IUserInfo } from 'types/login';
import { checkUser } from 'services/auth';
import styles from './main.module.css';

const getDividedArray = (array: IAlbum[], n: number) => {
  const newArray = [];
  for (let i = 0; i < array.length; i += n) {
    const slicedArray = array.slice(i, i + n);
    newArray.push([...slicedArray, ...Array(9 - slicedArray.length)]);
  }
  return newArray;
};

interface IProps {
  data: IAlbum[];
  userInfo: IUserInfo;
  // eslint-disable-next-line react/require-default-props
  error?: any;
}

const Main = ({ data, userInfo, error }: IProps) => {
  if (error) console.log(error);
  const [isCopy, onCopy] = useCopyClipBoard();
  const [popup, setPopup] = useState({ status: '', message: '' });
  const [pageIndex, setPageIndex] = useState(0);
  const templateArray: Array<IAlbum[]> = getDividedArray(data, 9);
  const hasNew = data.some(item => !item.read);
  const isEmpty = data.some(item => item === undefined);
  const hasPopUp = isCopy && popup.status;

  const onChangeCarousel = (now: number | undefined) => {
    if (typeof now === 'number') setPageIndex(now);
  };

  const onClickShareBtn = async () => {
    try {
      await onCopy(
        `${
          process.env.NODE_ENV === 'production'
            ? 'https://plz-front-oglgo62l5-highjoon.vercel.app'
            : 'http://localhost:3000'
        }/write/${userInfo.id}`,
      );
      setPopup({ status: 'success', message: '복사되었습니다' });
    } catch {
      setPopup({ status: 'error', message: '다시 시도해주세요' });
    }
  };

  return (
    <section className={styles.container}>
      <Header page="home" />
      <h1 className={`heading1 ${styles.headline}`}>
        {hasNew && (
          <>
            <p>새로운 플리가 도착했어요.</p>
            <p>바로 꺼내볼까요?</p>
          </>
        )}
        {!hasNew && (
          <>
            <p>모든 플리를 확인했어요.</p>
            <p>나만의 플리를 만들어볼까요?</p>
          </>
        )}
        {isEmpty && (
          <>
            <p>플리가 비어있네요.</p>
            <p>얼른 나만의 플리를 채워보세요!</p>
          </>
        )}
      </h1>
      <Carousel animation="slide" autoPlay={false} indicators={false} onChange={onChangeCarousel}>
        {templateArray.map((item, index) => (
          <div className={styles.albumList} key={item[index].id}>
            <Template list={item} />
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
      {hasPopUp && <PopupModal popup={popup} setPopup={setPopup} />}
      {hasNew && <NewArriveModal />}
    </section>
  );
};

export default Main;

export const getServerSideProps: GetServerSideProps = async context => {
  const { token } = getCookies(context);
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const [data, userInfo] = await Promise.all([getAlbumList(), checkUser<IUserInfo>()]);
    return { props: { data, userInfo } };
  } catch (e) {
    return { props: { error: e } };
  }
};
