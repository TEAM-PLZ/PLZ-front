import Image from 'next/image';

import styles from './newArriveModal.module.css';

const NewArriveModal = () => {
  return (
    <div className={styles.background}>
      <p className={styles.headline}>
        <span>딩동!</span>
        <br />
        메시지 플리가 도착했어요!
      </p>
      <Image src="/images/lp_envelope.png" width="328" height="350" alt="lp_envelope" />
      <button className={styles.button}>플리 확인하러 가기</button>
    </div>
  );
};

export default NewArriveModal;
