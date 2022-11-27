import Image from 'next/image';
import React from 'react';
import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logos}>
        <span>내 플리를 부탁해,</span>
        <Image src="/icons/logo.svg" width="50" height="45" alt="logo" />
      </div>
      <div className={styles.icons}>
        <Image src="/icons/alarm.svg" width="24" height="24" alt="alarm_icon" />
        <Image src="/icons/hamburger.svg" width="24" height="24" alt="menu_icon" />
      </div>
    </div>
  );
};

export default Header;
