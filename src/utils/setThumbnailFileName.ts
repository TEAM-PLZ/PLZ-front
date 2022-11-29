export default function setThumbnailFileName(url: string) {
  const a = url.split('/');
  a[a.length - 1] = 'mqdefault.jpg';
  return a.join('/');
}
