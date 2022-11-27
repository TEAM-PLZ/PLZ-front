import Image from 'next/image';
import React from 'react';
import styles from './album.module.css';

interface IProps {
  albumSrc: string;
}
const Album = ({ albumSrc = '/icons/empty_lp.svg' }: IProps) => {
  console.log('albumSrc', albumSrc);
  return (
    <div className={styles.album}>
      <div className={styles.newIcon}>NEW</div>
      <div className={styles.albumBox}>
        <Image src={albumSrc} alt="lp_icon" width={0} height={0} className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Album;
