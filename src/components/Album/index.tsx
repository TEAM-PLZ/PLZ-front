import Image from 'next/image';
import React from 'react';
import styles from './album.module.css';

interface IProps {
  albumSrc: string;
}
const Album = ({ albumSrc }: IProps) => {
  const src = albumSrc || '/icons/empty_lp.svg';

  return (
    <div className={styles.album}>
      <div className={styles.newIcon}>NEW</div>

      <div className={styles.albumBox}>
        <Image src={src} alt="lp_icon" width={0} height={0} className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Album;
