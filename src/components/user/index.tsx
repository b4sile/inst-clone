import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { Avatar } from '..';
import { Link } from 'react-router-dom';

type UserProps = {
  username: string;
  avatarUrl?: string;
  variant?: 'big' | 'small' | 'middle';
  fullName?: string;
  tag?: string;
  className?: string;
};

export const User = React.memo(
  ({
    username,
    fullName,
    tag,
    avatarUrl,
    className,
    variant = 'small',
  }: UserProps) => {
    const avatarSize =
      variant === 'small' ? 32 : variant === 'middle' ? 44 : 56;

    return (
      <div className={cn(s.container, className)}>
        <Link to={`/${username}`} className={s.username}>
          <Avatar url={avatarUrl} size={avatarSize} />
        </Link>
        <div className={s.middle}>
          <Link to={`/${username}`} className={cn(s.username, s.link)}>
            {username}
          </Link>
          {fullName && <div className={s.fullName}>{fullName}</div>}
          {tag && <div className={s.tag}>{tag}</div>}
        </div>
      </div>
    );
  }
);
