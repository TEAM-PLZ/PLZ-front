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
import mockData from './mock';

const getDividedArray = (array: any[], n: number) => {
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
}

const Main = ({ data, userInfo }: IProps) => {
  const [isCopy, onCopy] = useCopyClipBoard();
  const [popup, setPopup] = useState({ status: '', message: '' });
  const [pageIndex, setPageIndex] = useState(0);
  const templateArray = getDividedArray(mockData, 9);
  const hasNew = mockData.some(item => !item.read);
  const hasPopUp = isCopy && popup.status;

  const onChangeCarousel = (now: any) => {
    setPageIndex(now);
  };

  const onClickShareBtn = async () => {
    try {
      await onCopy(`write주소/${userInfo.id}`);
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
    const [data, userInfo] = await Promise.all([getAlbumList(), checkUser<IUserInfo>()]);
    return { props: { data, userInfo } };
  } catch (e) {
    return { notFound: true };
  }
};
