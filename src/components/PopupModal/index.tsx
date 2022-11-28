import Image from 'next/image';
import styles from './PopupModal.module.css';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';

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
    }, 1000);
  }, [popup]);

  return (
    <div className={`${styles.popup_modal}`}>
      <Image
        src={iconSrc ? iconSrc : ''}
        width="28"
        height="28"
        alt="popup_icon"
        className="m-auto mb-[8px]"
      />
      <p className="bar2 m-auto whitespace-pre-wrap text-center">{popup.message}</p>
    </div>
  );
};

export default PopupModal;
