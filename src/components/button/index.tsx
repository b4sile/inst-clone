import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { Spinner } from '../spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
  color?: 'primary' | 'secondary';
  variant?: 'contained' | 'outlined';
}

export const Button = ({
  className,
  children,
  disabled,
  fullWidth,
  variant = 'contained',
  color = 'primary',
  isLoading = false,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      className={cn(s.button, className, {
        [s.fullWidth]: fullWidth,
        [s.button_contained]: variant === 'contained',
        [s.button_outlined]: variant === 'outlined',
        [s.secondary]: color === 'secondary',
        [s.button_disabled]: disabled,
      })}
      {...restProps}
    >
      <span className={cn({ [s.isLoading]: isLoading })}>{children}</span>
      {isLoading && <Spinner className={s.spinner} variant={variant} />}
    </button>
  );
};
