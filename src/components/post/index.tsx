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
import { Link } from 'react-router-dom';

interface PostProps extends PostInterface {
  className?: string;
  isFullPost?: boolean;
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
    isFullPost,
    photoId,
  }: PostProps) => {
    return (
      <article
        className={cn(
          s.container,
          { [s.container__fullpost]: isFullPost },
          className
        )}
      >
        <Paper className={cn({ [s.fullpost]: isFullPost })}>
          {!isFullPost && (
            <header className={s.header}>
              <User username={user.username} />
            </header>
          )}
          {isFullPost ? (
            <div className={s.img__fullpost}>
              <Image src={imageSrc} />
            </div>
          ) : (
            <Link to={`/p/${photoId}`}>
              <Image src={imageSrc} className={s.img__fullpost} />
            </Link>
          )}
          <div className={cn({ [s.fullpost__right]: isFullPost })}>
            {isFullPost && (
              <header
                className={cn(s.header, { [s.header__fullpost]: isFullPost })}
              >
                <User username={user.username} />
              </header>
            )}
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
            <CommentInput
              variant={isFullPost ? 'fullpost' : 'timeline'}
              className={cn({ [s.fullpost__input]: isFullPost })}
              docId={docId}
            />
          </div>
        </Paper>
      </article>
    );
  }
);
