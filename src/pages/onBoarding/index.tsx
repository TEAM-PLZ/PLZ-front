import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from './onBoarding.module.css';

const onBoarding = () => {
  const router = useRouter();
  const imageList = [
    {
      src: '/images/onboarding1.svg',
      title: '모두에게 공유해요',
      text: '내 플리 보관함 링크를 공유하고\n 친구들에게 플리를 받아보세요!',
    },
    {
      src: '/images/onboarding2.svg',
      title: '나만의 플리를 들어요',
      text: ' 나에게 도착한 플리 메시지를 열어\n 어떤 내용이 들어 있는지 확인해보세요!',
    },
    {
      src: '/images/onboarding3.svg',
      title: '내 마음을 전해요',
      text: '직접 선곡한 LP와 함께 따뜻한 한마디로\n 내 마음을 특별하게 전해보세요!',
    },
  ];
  const [page, setPage] = useState(0);
  const backBtn = () => {
    if (!(page === 0)) {
      setPage(page - 1);
    }
  };
  const skipBtn = () => {
    setPage(2);
  };

  const nextPage = () => {
    setPage(page < imageList.length - 1 ? page + 1 : 0);
  };
  const start = () => {
    router.push('/main');
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <button
          type="button"
          onClick={backBtn}
          style={{
            opacity: `${page >= 1 ? '1' : '0'}`,
          }}
        >
          <Image
            src="/icons/back.svg"
            width="28"
            height="28"
            alt="back_icon"
            className="cursor-pointer"
          />
        </button>

        <button type="button" onClick={skipBtn}>
          <span className="text-white body1">SKIP</span>
        </button>
      </div>
      <div className={styles.onBoardingImgFrame}>
        <div className={styles.onBoardingImgList}>
          {imageList.map(item => {
            return (
              <div
                className={styles.onBoardingImgBox}
                key={item.src}
                style={{
                  transform: `translateX(${page * -388}px)`,
                  transition: 'transform 1s ease-in',
                }}
              >
                <Image
                  src={item.src}
                  width="0"
                  height="0"
                  alt="onBoardingImg"
                  className={styles.onBoardingImg}
                />
                <div className={styles.onBoardingTxtBox}>
                  <p className={`heading1 ${styles.onBoardingTitle}`}>{item.title}</p>
                  <p className={`note ${styles.onBoardingText}`}>{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.circleBtnList}>
        {imageList.map((item, idx) => {
          return (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              type="button"
              key={item.src}
              className={styles.circleBtn}
              onClick={() => setPage(idx)}
              style={{
                width: `${idx === page ? '16px' : '6px'}`,
                background: `${idx === page ? 'white' : '#7B7B7B'}`,
              }}
            />
          );
        })}
      </div>
      {page === imageList.length - 1 ? (
        <button type="button" className={styles.onBoardingBtn} onClick={start}>
          <span className="body1">플리 보관함 보러가기</span>
        </button>
      ) : (
        <button type="button" className={styles.onBoardingBtn} onClick={nextPage}>
          <span className="body1">다음</span>
        </button>
      )}
    </section>
  );
};

export default onBoarding;
