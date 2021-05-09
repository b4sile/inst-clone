import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  children: string;
}

export const Button = ({
  className,
  children,
  disabled,
  fullWidth,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      className={cn(s.button, className, {
        [s.fullWidth]: fullWidth,
        [s.button_disabled]: disabled,
      })}
      {...restProps}
    >
      {children}
    </button>
  );
};
