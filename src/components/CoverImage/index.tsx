import Image from 'next/image';
import styles from './coverImage.module.css';

interface ICoverImage {
  src: string;
  style: string;
}

const CoverImage = ({ src, style }: ICoverImage) => {
  return (
    <div className={`relative ${style}`}>
      <div className={styles.cover_image_filter} />
      <Image src={src} layout="fill" alt="random_image" className="z-0 object-cover" />
    </div>
  );
};

export default CoverImage;
