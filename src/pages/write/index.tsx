import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import useInputs from 'hooks/useInputs';
import { IYoutube } from 'types';
import setThumbnailFileName from 'utils/setThumbnailFileName';
import { sendAlbum } from 'services/album';
import Header from 'components/Header';
import styles from './write.module.css';
import SnackBar from 'components/SnackBar';
import getRandomImage from 'utils/getRandomImage';

interface IForm {
  singer: string;
  title: string;
  toNickname: string;
  message: string;
}

interface ISnackBarList {
  status: string;
  message: string;
}

const Write = () => {
  const [url, setUrl] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [coverImgFile, setCoverImgFile] = useState<File>();
  const [randomImageSrc, setRandomImageSrc] = useState<string>('/images/image1.png');

  const [snackBar, setSnackBar] = useState<ISnackBarList>({
    status: '',
    message: '',
  });
  const [{ singer, title, toNickname, message }, handleChange] = useInputs<IForm>({
    singer: '',
    title: '',
    toNickname: '',
    message: '',
  });

  const getYoutubeData = async (url: string) => {
    if (!url) return;
    try {
      const result = await axios.get<IYoutube>(`https://www.youtube.com/oembed?url=${url}`);
      setThumbnailUrl(setThumbnailFileName(result.data.thumbnail_url));
      setSnackBar({ status: 'success', message: '성공적으로 링크를 가져왔습니다.' });
    } catch (e) {
      setSnackBar({ status: 'failure', message: '링크를 다시 확인해주세요.' });
    }
  };

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const onCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (coverImgUrl) URL.revokeObjectURL(coverImgUrl);

    setCoverImgFile(e.target.files[0]);
    setRandomImageSrc('');
    setCoverImgUrl(URL.createObjectURL(e.target.files[0]));
  };

  const onRandomImageClick = () => {
    setRandomImageSrc(getRandomImage(randomImageSrc));
    setCoverImgUrl('');
    setCoverImgFile(undefined);
  };

  const handleSubmitYoutubeLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getYoutubeData(url);
  };

  const handleSubmitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = new FormData();

    const obj = {
      message,
      randomCoverPath: randomImageSrc,
      receiverId: '3',
      singer,
      thumbnailImgPath: thumbnailUrl,
      title,
      url,
      writerNickname: toNickname,
    };

    Object.entries(obj).forEach(([key, value]) => {
      newFormData.append(`${key}`, value);
    });

    if (coverImgFile) newFormData.append('coverImgFile', coverImgFile as File);

    sendAlbum(newFormData)
      .then(res => {
        console.log(res);
        URL.revokeObjectURL(coverImgUrl);
      })
      .catch(e => console.log(e));
  };

  return (
    <>
      <div className={styles.container}>
        <Header page="write" />
        <h1 className={`heading1`}>LP에 담을 곡 선택</h1>
        <form onSubmit={handleSubmitYoutubeLink}>
          <input
            type="url"
            onChange={onUrlChange}
            value={url}
            placeholder="내 마음을 전할 음악을 선택해주세요"
            className={`body2 ${styles.input_url}`}
          />
          <button type="submit" className={`body1 ${styles.button_url}`}>
            링크 가져오기
            <Image
              src={'/icons/youtube.svg'}
              width="28"
              height="28"
              alt="youtube"
              className="ml-[6px]"
            />
          </button>
        </form>
        <div>
          <button className="bg-black">
            <label htmlFor="input-image">커버 업로드</label>
          </button>
          <input
            type="file"
            onChange={onCoverImageChange}
            name="image"
            id="input-image"
            accept="image/*"
            className="hidden"
          />
        </div>
        <div>
          <div className="relative w-[300px] h-[300px]">
            <Image
              src={coverImgUrl ? coverImgUrl : randomImageSrc}
              fill
              sizes="300px"
              alt="random_image"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <button onClick={onRandomImageClick}>새로고침</button>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmitFormData}>
          <p>가수이름 </p>
          <input type="text" name="singer" onChange={handleChange} value={singer} />
          <p>노래 제목 </p>
          <input type="text" name="title" onChange={handleChange} value={title} />
          <p>닉네임 </p>
          <input type="text" name="toNickname" onChange={handleChange} value={toNickname} />
          <p>메시지 </p>
          <input type="text" name="message" onChange={handleChange} value={message} />
          <div>
            <button type="submit">제출하기</button>
          </div>
        </form>
      </div>
      {snackBar?.status !== '' && <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />}
    </>
  );
};

export default Write;

//https://youtu.be/
//https://www.youtube.com/watch?v=

//https://www.youtube.com/watch?v=v6_GwXU1lkg // 유튜브 영상 url
//https://youtu.be/SS-4-dAz1s0 // 유튜브 공유하기 버튼
//https://www.youtube.com/watch?v=SS-4-dAz1s0&ab_channel=%EC%95%84%ED%87%B4%EC%82%AC%ED%95%98%EA%B3%A0%EC%8B%B6%EB%8B%A4

// 썸네일 가져오기 https://img.youtube.com/vi/{code}/0.jpg
// 썸네일 가져오기 https://img.youtube.com/vi/{code}/mqdefault.jpg
