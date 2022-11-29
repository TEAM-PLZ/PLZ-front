import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styles from './popupModal.module.css';

interface IPopupList {
  status: string;
  message: string;
}

interface IPopupModal {
  popup: IPopupList;
  setPopup: Dispatch<SetStateAction<IPopupList>>;
}

const PopupModal = ({ popup, setPopup }: IPopupModal) => {
  const iconSrc = {
    success: '/icons/popup_success.svg',
    error: '/icons/popup_error.svg',
  }[popup.status];

  useEffect(() => {
    setTimeout(() => {
      setPopup({
        status: '',
        message: '',
      });
    }, 2000);
  }, [popup]);

  return (
    <div className={`${styles.popup_modal}`}>
      <Image
        src={iconSrc || ''}
        width="28"
        height="28"
        alt="popup_icon"
        className="m-auto mb-[8px]"
      />
      <p className="m-auto text-center whitespace-pre-wrap bar2">{popup.message}</p>
    </div>
  );
};

export default PopupModal;
