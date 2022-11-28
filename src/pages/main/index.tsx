import Header from 'components/Header';
import NewArriveModal from 'components/NewArriveModal';
import styles from './main.module.css';
import { Dummy } from 'components/Album/type';
import Template from 'components/Album/Template';

const Main = () => {
  const dummy: Dummy[] = [
    { id: 1, albumSrc: '/icons/empty_lp.svg' },
    { id: 2, albumSrc: '/icons/empty_lp.svg' },
    { id: 3, albumSrc: '/icons/empty_lp.svg' },
    { id: 4, albumSrc: '/icons/empty_lp.svg' },
    { id: 5, albumSrc: '/icons/empty_lp.svg' },
    { id: 6, albumSrc: '/icons/empty_lp.svg' },
    { id: 7, albumSrc: '/icons/empty_lp.svg' },
    { id: 8, albumSrc: '/icons/empty_lp.svg' },
    { id: 9, albumSrc: '/icons/empty_lp.svg' },
  ];

  return (
    <div className={styles.container}>
      <Header page="home" />
      <p className={`heading1 ${styles.headline}`}>
        <span className="block">새로운 플리가 도착했어요</span>
        <span className="block">바로 꺼내볼까요?</span>
      </p>

      <div className={styles.albumList}>
        <Template list={dummy.slice(0, 3)} />
        <Template list={dummy.slice(3, 6)} />
        <Template list={dummy.slice(6, 9)} />
      </div>

      {/* <NewArriveModal/> */}
    </div>
  );
};

export default Main;
