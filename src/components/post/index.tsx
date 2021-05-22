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

export const Post = React.memo(
  ({
    imageSrc,
    className,
    user,
    comments,
    caption,
    docId,
    isLiked,
    dateCreated,
    likes,
  }: PostProps) => {
    return (
      <article className={cn(s.container, className)}>
        <Paper>
          <header className={s.header}>
            <User username={user.username} />
          </header>
          <Image src={imageSrc} />
          <div className={s.middle}>
            <Controls
              date={dateCreated}
              isLiked={isLiked}
              countLikes={likes.length}
              docId={docId}
            />
            <Comment
              className={s.caption}
              username={user.username}
              text={caption}
            />
            <ul className={s.comments}>
              {comments.map(({ comment, displayName }, ind) => (
                <li className={s.comment} key={`${displayName}_${ind}`}>
                  <Comment username={displayName} text={comment} />
                </li>
              ))}
            </ul>
          </div>
          <CommentInput docId={docId} />
        </Paper>
      </article>
    );
  }
);
