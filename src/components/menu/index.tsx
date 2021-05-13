import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';

interface MenuProps {
  children: React.ReactNode;
  visible: boolean;
  className?: string;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ children, className, visible }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(s.container, className, {
          [s.container_active]: visible,
        })}
      >
        {children}
      </div>
    );
  }
);
