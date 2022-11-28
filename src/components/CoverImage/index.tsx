import Image from 'next/image';
import styles from './coverImage.module.css';

interface ICoverImage {
  src: string;
  style: string;
}

const CoverImage = ({ src, style }: ICoverImage) => {

  return (
    <div className={`relative ${style}`}>
      <div className={styles.cover_image_filter}></div>
      <Image src={src} layout="fill" alt="random_image" className="object-cover z-0" />
    </div>
  );
};

export default CoverImage;
