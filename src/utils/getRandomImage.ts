export default function getRandomImage(curImageSrc: string) {
  let imageNumber = Math.floor(Math.random() * 10 + 1);
  while (`/images/image${imageNumber}.png` === curImageSrc) {
    imageNumber = Math.floor(Math.random() * 10 + 1);
  }

  return `/images/image${imageNumber}.png`;
}
