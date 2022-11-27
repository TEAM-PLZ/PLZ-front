import Header from 'components/Header';
import styles from './main.module.css';

const Main = () => {
  return (
    <div className={styles.container}>
      <Header page="home" />
      <p className={styles.headline + 'heading2'}>
        <span>새로운 플리가 도착했어요</span>
        <br />
        <span>바로 꺼내볼까요?</span>
      </p>
    </div>
  );
};

export default Main;
