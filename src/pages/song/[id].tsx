import { GetServerSideProps } from 'next/types';
import React, { useEffect, useState } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps, YouTubeEvent } from 'react-youtube';
import { getVideoId } from 'utils/getVideoId';

interface IProps {
  id: string;
  data: {
    videoId: string;
    url: string;
    thumbnailUrl: string;
    singer: string;
    songTitle: string;
    toNickname: string;
    message: string;
  };
}

const DetailPage = ({ id, data }: IProps) => {
  const [youtube, setYoutube] = useState<any>();
  const [playState, setPlayState] = useState<any>(0);
  const [curTime, setCurTime] = useState(0);

  const onPlayerReady: YouTubeProps['onReady'] = event => {
    // access to player in all event handlers via event.target
    setYoutube(event.target);
    console.log(event.target);
  };
  const onPlaying = () => youtube.playVideo();
  const stopMute = () => youtube.unMute();
  const getState = () => youtube.getPlayerState();

  useEffect(() => {
    if (typeof youtube !== 'object' || youtube === null) return;

    // youtube.h.setAttribute(
    //   'sandbox',
    //   'allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation',
    // );
  }, [youtube]);

  return (
    <>
      <div>
        <YouTube
          videoId={data.videoId}
          opts={{
            width: '0',
            height: '0',
            // playerVars: {
            //   autoplay: 1,
            //   rel: 0,
            //   modestbranding: 1,
            // },
          }}
          onReady={onPlayerReady}
          //이벤트 리스너
          onStateChange={(event: YouTubeEvent) => {
            console.log(event.data);
            // if (event.data === 1) {
            //   timer.setInterval(() => {}, 1000);
            // }
          }}
          onEnd={e => {
            e.target.stopVideo(0);
          }}
        />
        <button id="start" onClick={() => youtube.playVideo()}>
          재생
        </button>
        <button
          onClick={() => {
            youtube.pauseVideo();
            console.log(youtube);
          }}
        >
          정지
        </button>
        <button onClick={() => youtube.mute()}>뮤트</button>
        <button onClick={() => youtube.unMute()}>언뮤트</button>
        <button onClick={() => setPlayState(youtube.getPlayerState())}>값내놔</button>
        <p>{youtube && `${curTime}/ ${youtube.getDuration()}`}</p>
      </div>
    </>
  );
};

/*

*/

export default DetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  try {
    const mockData = {
      videoId: getVideoId('https://www.youtube.com/watch?v=kxgj5af8zg4'),
      url: 'https://www.youtube.com/watch?v=kxgj5af8zg4',
      thumbnailUrl: 'https://i.ytimg.com/vi/kxgj5af8zg4/maxresdefault.jpg',
      singer: 'Weekend',
      songTitle: 'Out of Time',
      toNickname: 'Froggy',
      message: '가즈아',
    };

    return {
      props: {
        id,
        data: mockData,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
