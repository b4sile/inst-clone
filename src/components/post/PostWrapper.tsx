import React from 'react';
import { Post } from '.';
import { usePost } from '../../hooks/usePost';
import { PostSkeleton } from '../postSkeleton';

type PostWrapperProps = { isModalPost?: boolean };

export const PostWrapper = ({ isModalPost }: PostWrapperProps) => {
  const { post, isLoading } = usePost();

  if (isLoading && !post) return <PostSkeleton isFullPost />;
  if (!post) return <h2>This post doesn't exist.</h2>;

  return <Post {...post} isFullPost isModalPost={isModalPost} />;
};
