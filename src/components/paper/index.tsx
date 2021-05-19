import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';

type PaperProps = { className?: string; children: React.ReactNode };

export const Paper = ({ children, className }: PaperProps) => {
  return <div className={cn(s.container, className)}>{children}</div>;
};
