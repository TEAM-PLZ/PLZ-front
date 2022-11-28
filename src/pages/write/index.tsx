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
import CoverImage from 'components/CoverImage';

interface IForm {
  singer: string;
  title: string;
  writerNickname: string;
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
  const [{ singer, title, writerNickname, message }, handleChange] = useInputs<IForm>({
    singer: '',
    title: '',
    writerNickname: '',
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

  const handleSubmitFormData = () => {
    const newFormData = new FormData();

    const obj = {
      message,
      randomCoverPath: randomImageSrc,
      receiverId: '3',
      singer,
      thumbnailImgPath: thumbnailUrl,
      title,
      url,
      writerNickname: writerNickname,
    };

    Object.entries(obj).forEach(([key, value]) => {
      newFormData.append(`${key}`, value);
    });

    if (coverImgFile) newFormData.append('coverImgFile', coverImgFile as File);

    sendAlbum(newFormData)
      .then(res => {
        // 성공 페이지
        console.log(res);
        URL.revokeObjectURL(coverImgUrl);
      })
      .catch(e => {
        //실패 페이지
        console.log(e);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <Header page="write" onSubmit={handleSubmitFormData} />
        <h1 className={`heading1 ${styles.title_text}`}>{`먼저 LP에 담을 곡을\n골라보세요`}</h1>
        <form onSubmit={handleSubmitYoutubeLink}>
          <input
            type="url"
            onChange={onUrlChange}
            value={url}
            placeholder="전달할 유튜브 링크를 복사해서 넣어주세요."
            className={`note ${styles.input_url}`}
          />
          <button type="submit" className={`body1 ${styles.button_url}`}>
            링크 인증하기
            <Image
              src={'/icons/link_check.svg'}
              width="28"
              height="28"
              alt="link_check"
              className="ml-[6px]"
            />
          </button>
        </form>
        <div className="w-[200px] h-[200px]  m-auto bg-black"></div>
        <h1 className="heading1 mb-[8px]">노래 제목</h1>
        <input type="text" name="title" onChange={handleChange} value={title} />
        <p className="note text-[#b3b3b3]">아티스트</p>
        <input type="text" name="singer" onChange={handleChange} value={singer} />

        <div className="mt-[100px]"></div>
        <div>
          <h1 className={`heading1 ${styles.title_text}`}>{`이제 LP 커버를\n만들어볼까요?`}</h1>

          <CoverImage
            src={coverImgUrl ? coverImgUrl : randomImageSrc}
            style={`w-[300px] h-[300px] mx-auto mb-[28px]`}
          />

          <button onClick={onRandomImageClick} className={`body2 ${styles.button_cover}`}>
            커버 바꾸기
            <Image
              src={'/icons/change.svg'}
              width="24"
              height="24"
              alt="change"
              className="ml-[6px]"
            />
          </button>
          <label htmlFor="input-image" className={`body2 ${styles.button_cover}`}>
            커버 업로드
            <Image
              src={'/icons/upload.svg'}
              width="24"
              height="24"
              alt="change"
              className="ml-[6px]"
            />
          </label>
          <input
            type="file"
            onChange={onCoverImageChange}
            name="image"
            id="input-image"
            accept="image/*"
            className="hidden"
          />
        </div>

        <h1
          className={`heading1 mt-[120px] ${styles.title_text}`}
        >{`내 마음을 전할\n 메시지를 작성해보세요`}</h1>
        <div className={`note ${styles.reciever_nickname}`}>To. {`누구누구`}</div>
        <div className={styles.message}>
          <Image
            src={'/images/bottom_left_sticker.png'}
            width={140}
            height={48}
            alt="bottom-left-sticker"
            className="absolute bottom-[-45px] left-[-30px]"
          />
          <Image
            src={'/images/top_right_sticker.png'}
            width={140}
            height={48}
            alt="top-right-sticker"
            className="absolute top-[-60px] right-[-30px]"
          />
          <p className="body2 absolute left-[20px] top-[20px] text-[#1b2125]">2022.11.18</p>
          <textarea
            name="message"
            onChange={handleChange}
            value={message}
            maxLength={100}
            className={`note ${styles.textarea_message}`}
          />
          <p className="note absolute right-[20px] bottom-[20px] text-[#9c9c9c]">{`${message.length}자 / 100자`}</p>
        </div>
        <input
          type="text"
          name="writerNickname"
          onChange={handleChange}
          value={writerNickname}
          placeholder="From. 보내는 사람 닉네임을 입력해주세요."
          className={`note ${styles.writer_nickname}`}
        />
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
