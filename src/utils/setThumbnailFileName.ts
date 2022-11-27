export default function setThumbnailFileName(url: string) {
  let a = url.split('/');
  a[a.length - 1] = 'maxresdefault.jpg';
  return a.join('/');
}
