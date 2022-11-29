import Album from 'components/Template/Album';
import { IAlbum } from 'types';
import styles from './template.module.css';

interface IProps {
  list: IAlbum[];
}

const Row = ({ list }: IProps) => {
  return (
    <>
      <div className="flex justify-between px-[30px]">
        {list.map((item, index) => {
          return <Album key={item ? item.id : index} album={item} />;
        })}
      </div>
      <div className={styles.shelf} />
    </>
  );
};

const Templete = ({ list }: IProps) => {
  return (
    <>
      <Row list={list.slice(0, 3)} />
      <Row list={list.slice(3, 6)} />
      <Row list={list.slice(6, 9)} />
    </>
  );
};
export default Templete;
