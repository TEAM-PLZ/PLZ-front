import styles from './ProgressBar.module.css';

interface IProps {
  curTime: number;
  duration: number;
}

const ProgressBar = ({ curTime, duration }: IProps) => {
  return (
    <div className={styles.bar}>
      <div
        id="fill"
        className={styles.fill_bar}
        style={{ width: `${(curTime / duration) * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;
