import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';

type AvatarProps = { url?: string; size?: number; className?: string };

export const Avatar = ({ url, size = 32, className }: AvatarProps) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={cn(s.container, className)}
    >
      <img src={url || 'images/avatars/default.png'} alt="Avatar" />
    </div>
  );
};
