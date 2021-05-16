import React from 'react';
import cn from 'classnames';

type TimeLineProps = { className?: string };

export const Timeline = ({ className }: TimeLineProps) => {
  return (
    <section className={cn(className)}>
      <div>timeline</div>
    </section>
  );
};
