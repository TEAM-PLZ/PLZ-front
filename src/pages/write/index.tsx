import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import useInputs from 'hooks/useInputs';

interface IYoutube {
  author_name: string;
  author_url: string;
  height: number;
  html: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_url: string;
  thumbnail_width: number;
  title: string;
  type: string;
  version: string;
  width: number;
}

interface IForm {
  singer: string;
  songTitle: string;
  toNickname: string;
  message: string;
}

const WriteTest = () => {
  const [url, setUrl] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [coverImgFile, setCoverImgFile] = useState<File>();
  const [{ singer, songTitle, toNickname, message }, handleChange] = useInputs<IForm>({
    singer: '',
    songTitle: '',
    toNickname: '',
    message: '',
  });

  const changeFileName = (url: string) => {
    let a = url.split('/');
    a[a.length - 1] = 'maxresdefault.jpg';
    return a.join('/');
  };

  const getYoutubeData = async (url: string) => {
    if (!url) return;
    try {
      const result = await axios.get<IYoutube>(`https://www.youtube.com/oembed?url=${url}`);
      setThumbnailUrl(changeFileName(result.data.thumbnail_url));
    } catch (e) {
      // 에러 스낵바 생성
      console.log(e);
    }
  };

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const onCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (coverImgUrl) URL.revokeObjectURL(coverImgUrl);
    setCoverImgFile(e.target.files[0]);
    setCoverImgUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmitYoutubeLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getYoutubeData(url);
  };

  const handleSubmitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFormData = new FormData();

    const obj = {
      url,
      thumbnailUrl,
      singer,
      songTitle,
      toNickname,
      message,
    };

    Object.entries(obj).forEach(([key, value]) => {
      newFormData.append(`${key}`, value);
    });

    newFormData.append('coverImgFile', coverImgFile as File);
  };

  return (
    <section>
      {thumbnailUrl && <Image src={thumbnailUrl} width="200" height="113" alt="썸네일" />}
      {coverImgUrl && <Image src={coverImgUrl} width="200" height="113" alt="커버" />}
      <form onSubmit={handleSubmitYoutubeLink}>
        <label>유튜브 링크 입력</label>
        <input type="url" onChange={onUrlChange} value={url} />
        <button type="submit">링크 제출</button>
      </form>
      <hr />
      <div>
        <button>
          <label htmlFor="input-image">커버 업로드</label>
        </button>
        <input
          type="file"
          onChange={onCoverImageChange}
          name="image"
          id="input-image"
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
      <form className="flex flex-col" onSubmit={handleSubmitFormData}>
        <p>가수이름 </p>
        <input type="text" name="singer" onChange={handleChange} value={singer} />
        <p>노래 제목 </p>
        <input type="text" name="songTitle" onChange={handleChange} value={songTitle} />
        <p>닉네임 </p>
        <input type="text" name="toNickname" onChange={handleChange} value={toNickname} />
        <p>메시지 </p>
        <input type="text" name="message" onChange={handleChange} value={message} />
        <div>
          <button onClick={() => console.log(singer, songTitle, toNickname, message)}>
            콘솔 확인
          </button>
          <button type="submit">제출하기</button>
        </div>
      </form>
    </section>
  );
};

export default WriteTest;

//https://youtu.be/
//https://www.youtube.com/watch?v=

//https://www.youtube.com/watch?v=v6_GwXU1lkg // 유튜브 영상 url
//https://youtu.be/SS-4-dAz1s0 // 유튜브 공유하기 버튼
//https://www.youtube.com/watch?v=SS-4-dAz1s0&ab_channel=%EC%95%84%ED%87%B4%EC%82%AC%ED%95%98%EA%B3%A0%EC%8B%B6%EB%8B%A4

// 썸네일 가져오기 https://img.youtube.com/vi/{code}/0.jpg
// 썸네일 가져오기 https://img.youtube.com/vi/{code}/mqdefault.jpg
