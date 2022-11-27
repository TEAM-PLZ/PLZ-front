import Image from 'next/image';

import styles from './lp.module.css';

interface IProps {
  animation: 'rotate' | 'upDown';
}

const Lp = ({ animation }: IProps) => {
  const animationClassName = {
    rotate: styles.rotate,
    upDown: styles.upDown,
  }[animation];

  return (
    <div className={styles.lpWrapper}>
      <div className={styles.lpShadow}>
        <Image src="/images/lp_shadow.svg" width="248" height="248" alt="lp_shadow" />
      </div>
      <div className={`${styles.lp} ${animationClassName}`}>
        <Image src="/images/lp_black.svg" width="248" height="248" alt="lp_black" />
        <Image src="/images/lp_image.png" width="86" height="86" alt="lp_image" />
        <Image src="/images/lp_middle.svg" width="12" height="12" alt="lp_middle" />
      </div>
    </div>
  );
};

export default Lp;
