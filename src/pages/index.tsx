import Lp from 'components/Lp';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from './login.module.css';

const Login = () => {
  const router = useRouter();

  const sendPage = (isFirst: boolean) => {
    const path = isFirst ? '/onBoarding' : '/main';
    router.push(path);
  };

  const loginKaKao = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`;
    const popup = window.open(url, 'kakao', 'width=550,height=850,left=0,top=0');

    popup?.addEventListener('beforeunload', () => {
      sendPage(!!localStorage.getItem('isFirst'));
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <h1 className="heading1">내 플리를 부탁해, 플리즈</h1>
        <Image src="/icons/logo_lg.svg" width="82" height="61" alt="logo" />
      </div>
      <div className={styles.lpWrapper}>
        <Lp animation="rotate" />
      </div>
      <div className={styles.bottomWrapper}>
        <Image src="/images/message.svg" width="301" height="76" alt="message" />
        <button type="button" className={styles.kakaoButton} onClick={loginKaKao}>
          <Image src="/icons/kakao.svg" width="24" height="24" alt="kakao" />
          <span className={styles.kakaoButtonText}>카카오로 시작하기</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
