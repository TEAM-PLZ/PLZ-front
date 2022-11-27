import Image from 'next/image';
import React from 'react';
import styles from './album.module.css';

interface IProps {
  albumSrc: string
}
const Album = ({ albumSrc }: IProps) => {
  const src = albumSrc || '/icons/empty_lp.svg';

  return (
    <>
      <div className={styles.newIcon}>NEW</div>
      <Image src={src} width="120" height="120" alt="lp_icon" />
    </>
  );
};

export default Album;
