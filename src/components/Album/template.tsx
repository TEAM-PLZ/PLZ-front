import Album from 'components/Album';
import Image from 'next/image';
import React from 'react';
type Dummy = {
  albumSrc: string;
};
interface TemplateProps {
  list: Dummy[];
}

const Template = ({ list }: TemplateProps) => {
  return (
    <>
      <div className="flex">
        {list.map(item => {
          return <Album albumSrc={item.albumSrc} />;
        })}
      </div>
      <Image
        src="/images/lp_shelf.png"
        width={0}
        height={0}
        className="w-auto h-auto"
        alt="menu_icon"
      />
    </>
  );
};

export default Template;
