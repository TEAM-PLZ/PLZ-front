import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from './login.module.css';

const Login = () => {
  const router = useRouter();

  const loginKaKao = () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`;
    const popup = window.open(url, 'kakao', 'width=550,height=850,left=0,top=0');

    popup?.addEventListener('beforeunload', function () {
      sendPage(!!localStorage.getItem('isFirst'));
    });
  };

  const sendPage = (isFirst: boolean) => {
    const sendPage = isFirst ? '/onBoarding' : '/main';
    router.push(sendPage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <h1 className="heading1">내 플리를 부탁해, 플리즈</h1>
        <Image src="/icons/logo_lg.svg" width="82" height="61" alt="logo" />
      </div>
      <div className={styles.lpWrapper}>
        <div className={styles.lpShadow}>
          <Image src="/images/lp_shadow.svg" width="248" height="248" alt="lp_black" />
        </div>
        <div className={styles.lp}>
          <Image src="/images/lp_black.svg" width="248" height="248" alt="lp_black" />
          <Image src="/images/lp_image.png" width="86" height="86" alt="lp_image" />
          <Image src="/images/lp_middle.svg" width="12" height="12" alt="lp_middle" />
        </div>
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
