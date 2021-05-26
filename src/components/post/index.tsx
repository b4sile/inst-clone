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
  isModalPost?: boolean;
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
    isModalPost,
  }: PostProps) => {
    return (
      <article
        className={cn(
          s.container,
          {
            [s.container__fullpost]: isFullPost,
            [s.container__modalpost]: isModalPost,
          },
          className
        )}
      >
        <Paper
          className={cn({
            [s.fullpost]: isFullPost,
            [s.paper__modalpost]: isModalPost,
          })}
        >
          {!isFullPost && (
            <header className={s.header}>
              <User username={user.username} />
            </header>
          )}
          {isFullPost ? (
            <div
              className={cn(s.img__fullpost, {
                [s.img__modalpost]: isModalPost,
              })}
            >
              <Image src={imageSrc} />
            </div>
          ) : (
            <Link to={`/p/${photoId}`}>
              <Image src={imageSrc} className={cn(s.img__fullpost)} />
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
            <div className={cn(s.middle, { [s.middle__fullpost]: isFullPost })}>
              <Controls
                className={cn({ [s.controls__fullpost]: isFullPost })}
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
              <div
                className={cn(s.comments, {
                  [s.comments__fullpost]: isFullPost,
                })}
              >
                <ul className={cn({ [s.comments__list]: isFullPost })}>
                  {comments
                    .slice(
                      !isFullPost ? comments.length - 2 : 0,
                      comments.length
                    )
                    .map(({ comment, displayName }, ind) => (
                      <li className={s.comment} key={`${displayName}_${ind}`}>
                        <Comment username={displayName} text={comment} />
                      </li>
                    ))}
                  {!isFullPost && comments.length > 2 && (
                    <li>
                      <Link to={`/p/${photoId}`} className={s.comments__link}>
                        See all {comments.length} comments.
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
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
