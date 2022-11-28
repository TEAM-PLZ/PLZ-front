import React, { Fragment } from 'react';
import { Dummy } from './type';
import styles from './template.module.css';
import Album from 'components/Template/Album';

interface RowProps {
  list: Dummy[];
}

const Row = ({ list }: RowProps) => {
  return (
    <>
      <div className="flex justify-between px-[30px]">
        {list.map((item, index) => {
          return <Album key={index} albumSrc={item?.albumSrc} />;
        })}
      </div>
      <div className={styles.shelf} />
    </>
  );
};

const Templete = ({ array }: any) => {
  return (
    <>
      <Row list={array.slice(0, 3)} />
      <Row list={array.slice(3, 6)} />
      <Row list={array.slice(6, 9)} />
    </>
  );
};
export default Templete;
