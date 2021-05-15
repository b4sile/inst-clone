import React from 'react';
import cn from 'classnames';
import { Avatar } from '..';

type TimeLineProps = { className?: string };

export const Timeline = ({ className }: TimeLineProps) => {
  return (
    <section className={cn(className)}>
      <div>timeline</div>
      <Avatar
        url="https://st2.depositphotos.com/1064024/10769/i/600/depositphotos_107694484-stock-photo-little-boy.jpg"
        size={20}
      />
    </section>
  );
};
