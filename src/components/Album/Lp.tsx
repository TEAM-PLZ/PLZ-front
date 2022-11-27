import Image from 'next/image';
import React from 'react';

import styles from './lp.module.css';

const Lp = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/images/lp_black.png"
        width="248"
        height="248"
        alt="lp_black"
        className={styles.lpBlack}
      />
      <Image
        src="/images/lp_image.jpeg"
        width="86"
        height="86"
        alt="lp_image"
        className={styles.lpImage}
      />
      <Image
        src="/images/lp_middle.png"
        width="12"
        height="12"
        alt="lp_middle"
        className={styles.lpMiddle}
      />
    </div>
  );
};

export default Lp;
