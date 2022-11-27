import type { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import { checkUser } from 'services/auth';
import { cookies } from 'utils/cookie';
import type { IResCheckUser } from 'types/login';

interface Props {
  token: string;
}

const COOKIE_OPTIONS = { path: '/', maxAge: 28800 }; // 8H

const KakaoAuth: NextPage<Props> = props => {
  const getToken = async () => {
    cookies.set('token', props.token, COOKIE_OPTIONS);
    const result: IResCheckUser = await checkUser<IResCheckUser>();
    if (result?.isFirst) {
      localStorage.setItem('isFirst', String(result.isFirst));
    } else {
      localStorage.removeItem('isFirst');
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
