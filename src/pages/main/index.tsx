import Album from 'components/Album';
import Header from 'components/header/Header';
import NewArriveModal from 'components/NewArriveModal';
import styles from './main.module.css';

const Main = () => {
  const albumSrc = '';
  const albumlist = [];
  return (
    <div className={styles.container}>
      <Header />
      <p className={styles.headline}>
        <span>새로운 플리가 도착했어요</span>
        <br />
        <span>바로 꺼내볼까요?</span>
      </p>
      {/* { albumlist.map(()=>{})
} */}

      {/* <NewArriveModal/> */}
    </div>
  );
};

export default Main;
