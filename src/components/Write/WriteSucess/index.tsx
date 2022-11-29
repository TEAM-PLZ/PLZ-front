import LpCover from 'components/LpCover';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import submitStatusState from 'stores/write';
import styles from './writeSuccess.module.css';

interface IWriteSuccess {
  coverImgPath: string;
  thumbnailImgPath: string;
}

const WriteSuccess = ({ coverImgPath, thumbnailImgPath }: IWriteSuccess) => {
  const router = useRouter();
  const token = getCookie('token');
  const setSubmitStatus = useSetRecoilState(submitStatusState);

  const sendPage = (isFirst: boolean) => {
    const path = isFirst ? '/onBoarding' : '/main';
    router.push(path).then(() => setSubmitStatus(''));
  };

  const loginKaKao = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`;
    const popup = window.open(url, 'kakao', 'width=550,height=850,left=0,top=0');

    popup?.addEventListener('beforeunload', () => {
      sendPage(!!localStorage.getItem('isFirst'));
    });
  };

  const moveToMain = () => {
    router.replace('/main').then(() => setSubmitStatus(''));
  };

  return (
    <div className="h-screen py-[220px] overflow-y-scroll">
      <div className="flex items-center justify-center gap-2.5 mb-4">
        <Image src="/icons/heart_left.svg" width={24} height={24} alt="heart_left" />
        <Image src="/icons/heart_success.svg" width={64} height={64} alt="heart_success" />
        <Image src="/icons/heart_right.svg" width={24} height={24} alt="heart_left" />
      </div>
      <div className="heading1 mb-[50px]">
        <p>메시지 플리 전송이</p>
        <p>완료되었어요 :)</p>
      </div>
      <div className="mb-[70px]">
        <LpCover
          coverImgPath={coverImgPath}
          thumbnailImgPath={thumbnailImgPath}
          coverPosition="left"
          coverImgSize="w-[200px] h-[201px] left-40 max-[375px]:left-20"
          thumbnailImgSize="w-[69.35px] h-[69.35px]"
          lpSize={{
            wrapper: 'w-[200px] h-[200px] -right-14',
            outline: 'w-full h-full',
            center: 'w-[9.68px] h-[9.68px]',
          }}
        />
      </div>
      <div className="body1 mb-[55px]">
        <p>내 LP 보관함에는 어떤 곡이 도착했는지</p>
        <p>확인해보세요!</p>
      </div>
      <div className={styles.bottomWrapper}>
        {token === undefined ? (
          <button type="button" className={styles.kakaoButton} onClick={loginKaKao}>
            <Image src="/icons/kakao.svg" width="24" height="24" alt="kakao" />
            <span className={styles.kakaoButtonText}>카카오 로그인</span>
          </button>
        ) : (
          <button type="button" className={`bar1 ${styles.homeButton}`} onClick={moveToMain}>
            이동하기
          </button>
        )}
      </div>
    </div>
  );
};

export default WriteSuccess;
