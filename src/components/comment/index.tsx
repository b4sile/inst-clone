import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import { Avatar } from '..';
import { Link } from 'react-router-dom';

type CommentProps = {
  username: string;
  text: string;
  withAvatar?: boolean;
  className?: string;
};

export const Comment = React.memo(
  ({ username, text, withAvatar = false, className }: CommentProps) => {
    return (
      <div className={cn(s.container, className)}>
        {withAvatar && <Avatar url={`images/avatars/${username}.jpg`} />}
        <p className={cn(s.text, { [s.withAvatar]: withAvatar })}>
          <Link className={s.link} to={`/${username}`}>
            {username}
          </Link>
          &nbsp;{text}
        </p>
      </div>
    );
  }
);
