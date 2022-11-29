import React from 'react';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import LpCover from 'components/LpCover';
import { useSetRecoilState } from 'recoil';
import submitStatusState from 'stores/write';
import styles from './writeFailure.module.css';

interface IWriteFailure {
  coverImgPath: string;
  thumbnailImgPath: string;
}

const WriteFailure = ({ coverImgPath, thumbnailImgPath }: IWriteFailure) => {
  const token = getCookie('token');
  const setSubmitStatus = useSetRecoilState(submitStatusState);

  // const sendPage = (isFirst: boolean) => {
  //   const path = isFirst ? '/onBoarding' : '/main';
  // router.push(path).then(() => setSubmitStatus(''));
  //   window.location.replace(path);
  // };

  const loginKaKao = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`;
    const popup = window.open(url, 'kakao', 'width=550,height=850,left=0,top=0');

    popup?.addEventListener('beforeunload', () => {
      window.location.replace('/main');
      // sendPage(!!localStorage.getItem('isFirst'));
    });
  };

  const returnToWrite = () => {
    setSubmitStatus('');
  };

  return (
    <div className="h-screen py-[220px] overflow-y-scroll">
      <div className="flex items-center justify-center gap-2.5 mb-4">
        <Image src="/icons/tear_left.svg" width={24} height={24} alt="tear_left" />
        <Image src="/icons/heart_failure.svg" width={64} height={64} alt="heart_failure" />
        <Image src="/icons/tear_right.svg" width={24} height={24} alt="tear_right" />
      </div>
      <div className="heading1 mb-[70px]">
        <p>메시지 플리 전송이</p>
        <p>이루어지지 않았어요 :(</p>
      </div>
      <div className="body1 mb-[30px]">
        <p>오류로 인한 전송 실패</p>
        <p>다시 한번 시도해보세요!</p>
      </div>
      <div className="mb-[105px]">
        <LpCover
          coverImgPath={coverImgPath}
          thumbnailImgPath={thumbnailImgPath}
          coverPosition="left"
          coverImgSize="w-[100px] h-[101px] left-60"
          thumbnailImgSize="w-[34.79px] h-[34.79px]"
          lpSize={{
            wrapper: 'w-[100.32px] h-[100.32px] left-7',
            outline: 'w-full h-full',
            center: 'w-[4.85px] h-[4.85px]',
          }}
        />
      </div>
      <div className={styles.bottomWrapper}>
        {token === undefined ? (
          <>
            <button type="button" className={`bar1 ${styles.homeButton}`} onClick={returnToWrite}>
              <Image
                src="/icons/refresh_black.svg"
                width="24"
                height="24"
                alt="refresh_icon"
                className="cursor-pointer"
              />
              다시 시도하기
            </button>
            <button type="button" className={styles.kakaoButton} onClick={loginKaKao}>
              <Image src="/icons/kakao.svg" width="24" height="24" alt="kakao" />
              <span className={styles.kakaoButtonText}>카카오 로그인</span>
            </button>
          </>
        ) : (
          <button type="button" className={`bar1 ${styles.homeButton}`} onClick={returnToWrite}>
            <Image
              src="/icons/refresh_black.svg"
              width="24"
              height="24"
              alt="refresh_icon"
              className="cursor-pointer"
            />
            다시 시도하기
          </button>
        )}
      </div>
    </div>
  );
};

export default WriteFailure;
