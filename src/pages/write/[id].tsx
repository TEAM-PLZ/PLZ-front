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
import { GetServerSideProps } from 'next';
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

const Write = ({ id }: { id: string }) => {
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
      setPopup({ status: 'success', message: `?????????\n?????????????????????` });
    } catch (e) {
      setPopup({ status: 'error', message: `?????????\n????????? ??? ????????????` });
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
      receiverId: id,
      thumbnailImgPath: thumbnailUrl,
    };

    const errorMessage: ObjType = {
      message: `????????????\n??????????????????`,
      title: `??? ?????????\n??????????????????`,
      singer: `?????????\n??????????????????`,
      url: `????????? ?????????\n??????????????????`,
      thumbnailImgPath: `????????? ?????????\n??????????????????`,
      writerNickname: `????????????\n??????????????????`,
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(obj)) {
      if (value === '' && key !== 'randomCoverPath') {
        setPopup({ status: 'error', message: errorMessage[key] });
        return;
      }
      newFormData.append(`${key}`, value);
    }

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

            <h1 className={`heading1 ${styles.title_text}`}>{`?????? LP??? ?????? ??????\n???????????????`}</h1>
            <form onSubmit={handleSubmitYoutubeLink}>
              <input
                type="url"
                onChange={onUrlChange}
                value={url}
                placeholder="????????? ????????? ????????? ???????????? ???????????????."
                className={`note ${styles.input_url}`}
              />
              <button type="submit" className={`body1 ${styles.button_url}`}>
                ?????? ????????????
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
              placeholder="??? ????????? ??????????????????"
              className={`heading1 mb-[20px] text-white placeholder:text-white ${styles.input_song_detail}`}
            />
            <input
              type="text"
              name="singer"
              onChange={handleChange}
              value={singer}
              placeholder="???????????? ?????? ??????????????????"
              className={`note text-[#b3b3b3] mb-[100px] placeholder:text-[#b3b3b3] ${styles.input_song_detail}`}
            />
            <div>
              <h1 className={`heading1 ${styles.title_text}`}>{`?????? LP ?????????\n???????????????????`}</h1>

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
                ?????? ?????????
                <Image
                  src="/icons/change.svg"
                  width="24"
                  height="24"
                  alt="change"
                  className="ml-[6px]"
                />
              </button>
              <label htmlFor="input-image" className={`body2 ${styles.button_cover}`}>
                ?????? ?????????
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
            >{`??? ????????? ??????\n ???????????? ??????????????????`}</h1>
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
              <p className="note absolute right-[20px] bottom-[20px] text-[#9c9c9c]">{`${message.length}??? / 100???`}</p>
            </div>
            <div className="note text-[#b3b3b3] text-right w-[384px] border-b-[1px] mt-[30px] m-auto border-[#b3b3b3]">
              <span>From.</span>
              <input
                type="text"
                name="writerNickname"
                onChange={handleChange}
                value={writerNickname}
                placeholder="????????? ?????? ???????????? ??????????????????."
                className={`${styles.input_writer_nickname}`}
              />
            </div>
            <div className="pb-[180px]" />
          </div>
          <div
            className={`body1 ${styles.send_album}`}
            role="presentation"
            onClick={handleSubmitFormData}
          >
            ????????? ?????? ?????????
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  return {
    props: {
      id,
    },
  };
};
