import React, { Fragment } from 'react';
import Album from '..';
import { Dummy } from '../type';
import styles from './template.module.css';

interface TemplateProps {
  list: Dummy[];
}

const Template = ({ list }: TemplateProps) => {
  return (
    <>
      <div className="flex justify-between px-[30px]">
        {list.map(item => {
          return (
            <Fragment key={item.id}>
              <Album albumSrc={item.albumSrc} />
            </Fragment>
          );
        })}
      </div>
      <div className={styles.shelf} />
    </>
  );
};

export default Template;
