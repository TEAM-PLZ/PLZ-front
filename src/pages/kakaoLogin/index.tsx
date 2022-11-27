import type { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import { checkUser } from 'services/auth';

interface Props {
  token: string;
}

interface IResCheckUser {
  id: number;
  name: string;
  role: string;
  isFirst?: boolean;
}

const KakaoAuth: NextPage<Props> = props => {
  const getToken = async () => {
    localStorage.setItem('token', props.token);
    const result: IResCheckUser = await checkUser<IResCheckUser>();
    localStorage.setItem('isFirst', String(result?.isFirst || false));

    // 만약 한 사람이 온보딩을 안 보고 두 번 로그인 한다면?
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
