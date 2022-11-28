import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from './snackBar.module.css';

interface ISnackBarList {
  status: string;
  message: string;
}

interface ISnackBar {
  snackBar: ISnackBarList;
  setSnackBar: Dispatch<SetStateAction<ISnackBarList>>;
}

const SnackBar = ({ snackBar, setSnackBar }: ISnackBar) => {
  useEffect(() => {
    const interval = setInterval(() => {
      let temp = {
        status: '',
        message: '',
      };
      setSnackBar(temp);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [snackBar]);

  if (snackBar === null) return null;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.notification} ${styles.toast}`}>
        <div>
          {snackBar.status === 'success' ? (
            <div className={styles.toast_message}>
              <img src="/check.svg" alt="check" width="18px" height="18px" />
              <span className={styles.status}>{snackBar.message}</span>
            </div>
          ) : (
            <div className={styles.toast_message}>
              <img src="/wrong.svg" alt="check" width="18px" height="18px" />
              <span className={styles.status}>{snackBar.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnackBar;
