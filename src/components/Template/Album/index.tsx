/* eslint-disable no-nested-ternary */
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { IAlbum } from 'types/index';
import styles from './album.module.css';

interface IProps {
  album: IAlbum;
}
const IMAGE_PROPS = { width: 120, height: 120, className: 'w-full h-full object-cover' };

const Album = ({ album }: IProps) => {
  const router = useRouter();
  // const newIconStyle = !album?.read ? { opacity: 0 } : {};
  const hasImage = album?.coverImgPath;

  const moveToSongDetail = () => {
    if (album === undefined) return;
    router.push(`/song/${album.id}`);
  };

  return (
    <div className={styles.album}>
      {album?.read === false && (
        <div className={styles.newIcon}>
          {/* <div className={styles.newIcon} style={newIconStyle}> */}
          NEW
        </div>
      )}
      <div
        className={`${styles.albumBox} ${album !== undefined ? 'cursor-pointer' : ''}`}
        role="presentation"
        onClick={moveToSongDetail}
      >
        {hasImage && (
          <Image
            src="/images/album_backdrop.svg"
            className={styles.backdrop}
            alt="lp"
            width={47}
            height={114}
          />
        )}
        <Image
          src={
            album?.coverImgPath
              ? `${process.env.NEXT_PUBLIC_BASE_URL}/${album?.coverImgPath}`
              : album?.randomCoverPath
              ? album?.randomCoverPath
              : '/icons/empty_lp.svg'
          }
          alt="lp"
          {...IMAGE_PROPS}
        />
        {hasImage && <Image src="/images/album_light.svg" alt="lp" {...IMAGE_PROPS} />}
      </div>
    </div>
  );
};

export default Album;
