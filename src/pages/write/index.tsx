import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import useInputs from 'hooks/useInputs';
import { IYoutube } from 'types';
import setThumbnailFileName from 'utils/setThumbnailFileName';
import { sendAlbum } from 'services/album';
import Header from 'components/Header';
import getRandomImage from 'utils/getRandomImage';
import CoverImage from 'components/CoverImage';
import PopupModal from 'components/PopupModal';
import LpCover from 'components/LpCover';
import WriteSuccess from 'components/Write/WriteSucess';
import WriteFailure from 'components/Write/WriteFailure';
import { useRecoilState } from 'recoil';
import submitStatusState from 'stores/write';
import styles from './write.module.css';

interface IForm {
  singer: string;
  title: string;
  writerNickname: string;
  message: string;
}

type ObjType = {
  [index: string]: string;
};

const coverImgSize = 'w-[330px] h-[330px] max-[375px]:w-[180px] max-[375px]:h-[180px]';
const thumbnailImgSize = 'w-[114.44px] h-[114.44px] max-[375px]:w-[85px] max-[375px]:h-[85px]';
const lpSize = {
  wrapper: 'w-[330px] h-[330px] max-[375px]:w-[180px] max-[375px]:h-[180px]',
  outline: 'w-full h-full',
  center: 'w-[15.97px] h-[15.97px]',
};

const Write = () => {
  const [url, setUrl] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [coverImgFile, setCoverImgFile] = useState<File>();
  const [randomImageSrc, setRandomImageSrc] = useState<string>('/images/image1.png');
  const [popup, setPopup] = useState<{ status: string; message: string }>({
    status: '',
    message: '',
  });
  const [{ singer, title, writerNickname, message }, handleChange, setForm] = useInputs<IForm>({
    singer: '',
    title: '',
    writerNickname: '',
    message: '',
  });
  const [submitState, setSubmitState] = useRecoilState<string>(submitStatusState);

  const getYoutubeData = async (youtubeUrl: string) => {
    if (!youtubeUrl) return;
    try {
      const result = await axios.get<IYoutube>(`https://www.youtube.com/oembed?url=${youtubeUrl}`);
      setThumbnailUrl(setThumbnailFileName(result.data.thumbnail_url));
      setPopup({ status: 'success', message: `링크가\n확인되었습니다` });
    } catch (e) {
      setPopup({ status: 'error', message: `링크를\n불러올 수 없습니다` });
      setUrl('');
      setThumbnailUrl('');
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

  const onRefreshClick = () => {
    setRandomImageSrc('/images/image1.png');
    setCoverImgUrl('');
    setThumbnailUrl('');
    setCoverImgFile(undefined);
    setUrl('');
    setForm({
      singer: '',
      title: '',
      writerNickname: '',
      message: '',
    });
  };

  const handleSubmitYoutubeLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getYoutubeData(url);
  };

  const handleSubmitFormData = () => {
    const newFormData = new FormData();

    const obj: ObjType = {
      url,
      singer,
      title,
      message,
      writerNickname,
      randomCoverPath: randomImageSrc,
      receiverId: '3',
      thumbnailImgPath: thumbnailUrl,
    };

    const errorMessage: ObjType = {
      message: `메시지를\n입력해주세요`,
      title: `곡 제목을\n입력해주세요`,
      singer: `가수를\n입력해주세요`,
      url: `유튜브 링크를\n인증해주세요`,
      writerNickname: `닉네임을\n입력해주세요`,
    };

    Object.keys(obj).forEach(key => {
      if (obj[key] === '' && key !== 'randomCoverPath') {
        setPopup({ status: 'error', message: errorMessage[key] });
        return;
      }
      newFormData.append(`${key}`, obj[key]);
    });

    if (coverImgFile) newFormData.append('coverImgFile', coverImgFile as File);

    sendAlbum(newFormData)
      .then(() => {
        setSubmitState('success');
        URL.revokeObjectURL(coverImgUrl);
      })
      .catch(() => {
        setSubmitState('failure');
      });
  };

  return (
    <div className={styles.container}>
      {submitState === 'success' && (
        <WriteSuccess
          coverImgPath={coverImgUrl || randomImageSrc}
          thumbnailImgPath={thumbnailUrl || '/images/image3.png'}
        />
      )}
      {submitState === 'failure' && (
        <WriteFailure
          coverImgPath={coverImgUrl || randomImageSrc}
          thumbnailImgPath={thumbnailUrl || '/images/image3.png'}
        />
      )}
      {submitState === '' && (
        <>
          <div className={styles.container}>
            <Header page="write" onRefresh={onRefreshClick} />

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
                  src="/icons/link_check.svg"
                  width="28"
                  height="28"
                  alt="link_check"
                  className="ml-[6px]"
                />
              </button>
            </form>
            <div className="mt-[100px] mb-[40px]">
              <LpCover
                coverImgPath={coverImgUrl || randomImageSrc}
                thumbnailImgPath={thumbnailUrl || '/images/image3.png'}
                coverPosition="right"
                coverImgSize={coverImgSize}
                thumbnailImgSize={thumbnailImgSize}
                lpSize={lpSize}
              />
            </div>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={title}
              placeholder="곡 제목을 입력해주세요"
              className={`heading1 mb-[20px] text-white placeholder:text-white ${styles.input_song_detail}`}
            />
            <input
              type="text"
              name="singer"
              onChange={handleChange}
              value={singer}
              placeholder="아티스트 명을 입력해주세요"
              className={`note text-[#b3b3b3] mb-[100px] placeholder:text-[#b3b3b3] ${styles.input_song_detail}`}
            />
            <div>
              <h1 className={`heading1 ${styles.title_text}`}>{`이제 LP 커버를\n만들어볼까요?`}</h1>

              <CoverImage
                src={coverImgUrl || randomImageSrc}
                // eslint-disable-next-line react/style-prop-object
                style="w-[300px] h-[300px] mx-auto mb-[28px]"
              />

              <button
                type="button"
                onClick={onRandomImageClick}
                className={`body2 ${styles.button_cover}`}
              >
                커버 바꾸기
                <Image
                  src="/icons/change.svg"
                  width="24"
                  height="24"
                  alt="change"
                  className="ml-[6px]"
                />
              </button>
              <label htmlFor="input-image" className={`body2 ${styles.button_cover}`}>
                커버 업로드
                <Image
                  src="/icons/upload.svg"
                  width="24"
                  height="24"
                  alt="change"
                  className="ml-[6px]"
                />
                <input
                  type="file"
                  onChange={onCoverImageChange}
                  name="image"
                  id="input-image"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>

            <h1
              className={`heading1 mt-[120px] ${styles.title_text}`}
            >{`내 마음을 전할\n 메시지를 작성해보세요`}</h1>
            <div className={styles.message}>
              <Image
                src="/images/bottom_left_sticker.png"
                width={140}
                height={48}
                alt="bottom-left-sticker"
                className="absolute bottom-[-45px] left-[-30px]"
              />
              <Image
                src="/images/top_right_sticker.png"
                width={140}
                height={48}
                alt="top-right-sticker"
                className="absolute top-[-60px] right-[-30px]"
              />
              <p className="body2 absolute left-[20px] top-[20px] text-[#1b2125]">
                {new Date().toLocaleDateString()}
              </p>
              <textarea
                name="message"
                onChange={handleChange}
                value={message}
                maxLength={100}
                className={`note ${styles.textarea_message}`}
              />
              <p className="note absolute right-[20px] bottom-[20px] text-[#9c9c9c]">{`${message.length}자 / 100자`}</p>
            </div>
            <div className={`note ${styles.writer_nickname}`}>
              <span>From.</span>
              <input
                type="text"
                name="writerNickname"
                onChange={handleChange}
                value={writerNickname}
                placeholder="보내는 사람 닉네임을 입력해주세요."
                className={` ${styles.input_writer_nickname}`}
              />
            </div>
          </div>
          <div
            className={`body1 ${styles.send_album}`}
            role="presentation"
            onClick={handleSubmitFormData}
          >
            메시지 플리 보내기
            <Image
              src="/icons/letter.svg"
              width="28"
              height="28"
              alt="letter"
              className="ml-[8px]"
            />
          </div>
          {popup.status && <PopupModal popup={popup} setPopup={setPopup} />}
        </>
      )}
    </div>
  );
};

export default Write;
