import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { PostInterface } from '../../redux/slices/timelineSlice';
import { Image } from '../image';
import { User } from '..';
import { Paper } from '../paper';
import { Controls } from '../controls';
import { Comment } from '../comment';
import { CommentInput } from '../commentInput';

interface PostProps extends PostInterface {
  className?: string;
}

export const Post = ({ imageSrc, className, user }: PostProps) => {
  return (
    <article className={cn(s.container, className)}>
      <Paper>
        <header className={s.header}>
          <User username={user.username} />
        </header>
        <Image src={imageSrc} />
        <div className={s.middle}>
          <Controls countLikes={100} />
          <Comment
            username={user.username}
            text="lorem sdfsfasdfaf sdfasdffdsfsda sdfsdfsdfafds sdfasdafsdfafas sdfasdfsafsfdsf sdfadfdsafsdfsd"
          />
        </div>
        <CommentInput />
      </Paper>
    </article>
  );
};
