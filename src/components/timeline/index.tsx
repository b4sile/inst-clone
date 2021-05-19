import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';

type TimeLineProps = { className?: string };

export const Timeline = ({ className }: TimeLineProps) => {
  return (
    <div className={cn(s.container, className)}>
      <h1 className={s.header}>Getting Started</h1>
    </div>
  );
};
