import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import { useTimelinePosts } from '../../hooks/useTimelinePosts';
import { Post } from '../post';
import { PostSkeleton } from '../postSkeleton';

type TimeLineProps = { className?: string };

export const Timeline = React.memo(({ className }: TimeLineProps) => {
  const [posts, isLoading] = useTimelinePosts();

  return (
    <div className={cn(s.container, className)}>
      <h1 className={s.header}>Getting Started</h1>
      {isLoading && !posts.length ? (
        Array.from({ length: 3 }, (_, ind) => <PostSkeleton key={ind} />)
      ) : posts.length ? (
        posts.map((post) => (
          <Post className={s.item} key={post.docId} {...post} />
        ))
      ) : (
        <p>Follow people to see photos.</p>
      )}
    </div>
  );
});
