import type { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import { checkUser } from 'services/auth';
import type { IResCheckUser } from 'types/login';

interface Props {
  token: string;
}

const KakaoAuth: NextPage<Props> = props => {
  const getToken = async () => {
    localStorage.setItem('token', props.token);
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
