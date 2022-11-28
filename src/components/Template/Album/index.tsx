import Image from 'next/image';
import React from 'react';
import styles from './album.module.css';

interface IProps {
  albumSrc: string;
}
const IMAGE_PROPS = {
  width: 120,
  height: 120,
  className: 'w-full h-auto',
};

const Album = ({ albumSrc }: IProps) => {
  return (
    <div className={styles.album}>
      <div className={styles.newIcon}>NEW</div>
      <div className={styles.albumBox}>
        {albumSrc && (
          <Image
            src="/images/album_backdrop.svg"
            className={styles.backdrop}
            alt="lp"
            width={47}
            height={114}
          />
        )}
        <Image src={albumSrc || '/icons/empty_lp.svg'} alt="lp" {...IMAGE_PROPS} />
        {albumSrc && <Image src="/images/album_light.svg" alt="lp" {...IMAGE_PROPS} />}
      </div>
    </div>
  );
};

export default Album;
