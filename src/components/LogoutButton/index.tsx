/* eslint-disable no-console */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { logoutKaKao } from 'services/auth';
import { TPage } from 'components/Header/type';

interface IProps {
  page: TPage;
}

const LogoutButton = ({ page }: IProps) => {
  const router = useRouter();

  const onClick = async () => {
    try {
      await logoutKaKao();
      deleteCookie('token');
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <button type="button" onClick={onClick}>
      <Image
        src={page === 'home' ? '/icons/logout.svg' : '/icons/white_logout.svg'}
        width="24"
        height="24"
        alt="logout_icon"
      />
    </button>
  );
};

export default LogoutButton;
