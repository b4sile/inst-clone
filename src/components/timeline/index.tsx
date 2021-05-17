import React from 'react';
import cn from 'classnames';

type TimeLineProps = { className?: string };

export const Timeline = ({ className }: TimeLineProps) => {
  return (
    <div className={cn(className)}>
      <div>timeline</div>
    </div>
  );
};
