import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';

type PostProps = { className?: string };

export const Post = ({ className }: PostProps) => {
  return (
    <article className={cn(s.container, className)}>
      <div></div>
    </article>
  );
};
