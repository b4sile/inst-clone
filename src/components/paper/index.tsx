import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';

type PaperProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const Paper = ({ children, style, className }: PaperProps) => {
  return (
    <div style={style} className={cn(s.container, className)}>
      {children}
    </div>
  );
};
