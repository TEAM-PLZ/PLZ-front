import Header from 'components/Header';
import NewArriveModal from 'components/NewArriveModal';
import styles from './main.module.css';
import { Dummy } from 'components/Template/type';
import Template from 'components/Template';
import Carousel from 'react-material-ui-carousel';
import { useState } from 'react';
import Image from 'next/image';
const division = (array: any[], n: number) => {
  const newArray = [];
  for (let i = 0; i < array.length; i += n) {
    const slicedArray = array.slice(i, i + n);
    newArray.push([...slicedArray, ...Array(9 - slicedArray.length)]);
  }

  return newArray;
};

const Main = () => {
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const templateArray = division(dummy, 9);

  const onChangeCarousel = (now: any) => {
    console.log(now);
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
      <div className={styles.bottomWrapper}>
        <p className="body2">
          “내 플리 보관함 링크”를 친구에게 공유하고 <br /> 나만의 플리를 채워보세요!
        </p>
        <button className={styles.shareButton}>
          <Image src="/icons/link.svg" width="24" height="24" alt="link" />
          <span className="body1">내 플리 보관함 링크</span>
        </button>
      </div>

      {/* <NewArriveModal/> */}
    </div>
  );
};

export default Main;
