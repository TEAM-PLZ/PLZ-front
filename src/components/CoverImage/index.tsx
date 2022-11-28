import Image from 'next/image';
import { ImgHTMLAttributes } from 'react';
import styles from './coverImage.module.css';

interface ICoverImage extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  size: 'small' | 'medium' | 'large';
}

const CoverImage = ({ src, size }: ICoverImage) => {
  const sizeClassName = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  }[size];

  return (
    <div className={`relative ${sizeClassName}`}>
      <div className={styles.cover_image_filter}></div>
      <Image src={src} layout="fill" alt="random_image" className="object-cover z-0" />
    </div>
  );
};

export default CoverImage;
