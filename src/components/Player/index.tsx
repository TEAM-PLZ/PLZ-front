import { useState } from 'react';
import YouTube, { YouTubePlayer, YouTubeEvent } from 'react-youtube';
import { useRecoilState } from 'recoil';
import playState from 'stores/song';
import styles from './player.module.css';
import ProgressBar from './ProgressBar';

interface IPlayer {
  videoId: string;
}

const Player = ({ videoId }: IPlayer) => {
  const [youtube, setYoutube] = useState<YouTubePlayer>();
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useRecoilState<boolean>(playState);
  const [curTime, setCurTime] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timeInterval: any;
  const startInterval = () => {
    timeInterval = setInterval(() => {
      setCurTime(youtube.getCurrentTime());
    }, 300);
  };

  // const onPrevAlbum = () => {};

  // const onNextAlbum = () => {};

  const onPlay = () => {
    if (youtube) {
      youtube.playVideo();
      setIsPlaying(true);
    }
  };

  const onPause = () => {
    if (youtube) {
      youtube.pauseVideo();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <YouTube
        videoId={videoId}
        opts={{
          width: '0',
          height: '0',
        }}
        onReady={(event: YouTubeEvent) => {
          if (event.target.videoTitle === '') {
            // eslint-disable-next-line no-console
            console.log('에러메시지');
            return;
          }
          setYoutube(event.target);
          setDuration(event.target.getDuration());
        }}
        onStateChange={(event: YouTubeEvent) =>
          event.data === 1 ? startInterval() : clearInterval(timeInterval)
        }
        onEnd={(event: YouTubeEvent) => {
          event.target.stopVideo(0);
          setIsPlaying(false);
        }}
      />
      <section className={styles.player}>
        {youtube && <ProgressBar curTime={curTime} duration={duration} />}
        <div className={styles.control}>
          {/* <button type="button" onClick={onPrevAlbum}>
            <img src="/icons/left.svg" alt="left" />
          </button> */}
          {isPlaying ? (
            <button type="button" onClick={onPause}>
              <img src="/icons/pause.svg" className="mx-12" alt="pause" />
            </button>
          ) : (
            <button type="button" onClick={onPlay}>
              <img src="/icons/play.svg" className="mx-12" alt="play" />
            </button>
          )}
          {/* <button type="button" onClick={onNextAlbum}>
            <img src="/icons/right.svg" alt="right" />
          </button> */}
        </div>
      </section>
    </>
  );
};

export default Player;
