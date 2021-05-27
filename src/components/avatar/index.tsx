import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import Skeleton from 'react-loading-skeleton';
import { VALUES } from '../../constants/routes';

type AvatarProps = {
  url?: string | undefined;
  size?: number;
  className?: string;
};

export const Avatar = ({ url, size = 32, className }: AvatarProps) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={cn(s.container, className)}
    >
      {isLoading && url && <Skeleton circle width={size} height={size} />}
      <img
        style={isLoading ? { display: 'none' } : {}}
        src={url || VALUES.AVATAR}
        onLoad={() => setIsLoading(false)}
        alt="Avatar"
      />
    </div>
  );
};
