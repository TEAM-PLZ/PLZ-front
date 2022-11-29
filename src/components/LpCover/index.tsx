import React from 'react';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import playState from 'stores/song';
import CoverImage from 'components/CoverImage';
import styles from './lpCover.module.css';

interface ILpCover {
  coverImgPath: string;
  thumbnailImgPath: string;
  coverPosition: string;
  coverImgSize: string;
  thumbnailImgSize: string;
  lpSize: {
    wrapper: string;
    outline: string;
    center: string;
  };
}

const LpCover = ({
  coverImgPath,
  thumbnailImgPath,
  coverPosition,
  coverImgSize,
  thumbnailImgSize,
  lpSize,
}: ILpCover) => {
  const isPlaying = useRecoilValue<boolean>(playState);

  return (
    <div className="relative">
      {coverPosition === 'left' && (
        <div className={`${styles.lp_cover_left}`}>
          <CoverImage src={coverImgPath} style={coverImgSize} />
        </div>
      )}
      {coverPosition === 'right' && (
        <div className={`${styles.lp_cover_right}`}>
          <CoverImage src={coverImgPath} style={coverImgSize} />
        </div>
      )}
      <div className={`${styles.lp_wrapper} ${lpSize.wrapper}`}>
        <div
          className={`${styles.outline} ${styles.rotate} ${
            isPlaying ? styles.rotate__running : styles.rotate__paused
          } ${lpSize.outline}`}
        >
          <Image src="/images/lp_outline.png" fill sizes="100%" alt="outline" />
        </div>
        <div
          className={`${styles.image} ${styles.rotate} ${
            isPlaying ? styles.rotate__running : styles.rotate__paused
          } ${thumbnailImgSize}`}
        >
          <Image
            src={thumbnailImgPath}
            fill
            sizes="100%"
            alt="image"
            className="object-cover rounded-full"
          />
        </div>
        <div className={`${styles.center} ${lpSize.center}`}>
          <Image src="/images/lp_center.png" fill sizes="100%" alt="center" />
        </div>
      </div>
    </div>
  );
};

export default LpCover;
