import type { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import { checkUser } from 'services/auth';
import { setCookie } from 'cookies-next';
import type { IUserInfo } from 'types/login';
import { useRouter } from 'next/router';

interface IProps {
  token: string;
}

const COOKIE_OPTIONS = { path: '/', maxAge: 28800 }; // 8H

const KakaoAuth: NextPage<IProps> = ({ token }: IProps) => {
  const router = useRouter();
  const getToken = async () => {
    setCookie('token', token, COOKIE_OPTIONS);
    const result: IUserInfo = await checkUser<IUserInfo>();
    if (result?.isFirst) {
      localStorage.setItem('isFirst', String(result.isFirst));
      router.push('/onBoarding');
    } else {
      localStorage.removeItem('isFirst');
      router.push('/main');
    }
    window.self.close();
  };

  useEffect(() => {
    getToken();
  }, []);

  return null;
};
export default KakaoAuth;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { token } = query;

  return {
    props: { token },
  };
};
