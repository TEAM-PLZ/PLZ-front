import { useEffect, useState } from 'react';
import Image from 'next/image';
import Lp from 'components/Lp';
import styles from './newArriveModal.module.css';

const NewArriveModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const onClick = () => {
    setIsOpen(false);
  };
  if (!isOpen) return null;

  return (
    <div className={styles.background}>
      <p className={styles.headline}>
        <span>딩동!</span>
        <br />
        메시지 플리가 도착했어요!
      </p>
      <div className={styles.envelopEffect}>
        <Image src="/images/envelop_effect.svg" width="342" height="73" alt="envelop_effect" />
      </div>

      <div className={styles.envelopWrapper}>
        <Image src="/images/envelop_back.svg" width="352" height="400" alt="envelope_back" />
        <div className={styles.lpWrapper}>
          <Lp animation="upDown" />
        </div>
        <Image src="/images/envelop_front.svg" width="361" height="350" alt="envelope_front" />
      </div>
      <button type="button" className={styles.button} onClick={onClick}>
        플리 확인하러 가기
      </button>
    </div>
  );
};

export default NewArriveModal;
