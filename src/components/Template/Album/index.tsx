import Image from 'next/image';
import React from 'react';
import { IAlbum } from 'types/index';
import styles from './album.module.css';

interface IProps {
  album: IAlbum;
}
const IMAGE_PROPS = { width: 120, height: 120, className: 'w-full h-auto' };

const Album = ({ album }: IProps) => {
  const newIconStyle = !album?.read ? { opacity: 0 } : {};
  const hasImage = album?.coverImgPath;
  return (
    <div className={styles.album}>
      <div className={styles.newIcon} style={newIconStyle}>
        NEW
      </div>
      <div className={styles.albumBox}>
        {hasImage && (
          <Image
            src="/images/album_backdrop.svg"
            className={styles.backdrop}
            alt="lp"
            width={47}
            height={114}
          />
        )}
        <Image src={album?.coverImgPath || '/icons/empty_lp.svg'} alt="lp" {...IMAGE_PROPS} />
        {hasImage && <Image src="/images/album_light.svg" alt="lp" {...IMAGE_PROPS} />}
      </div>
    </div>
  );
};

export default Album;
