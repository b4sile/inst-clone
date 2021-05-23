import React from 'react';
import { Post } from '.';
import { usePost } from '../../hooks/usePost';
import { ProfileSkeleton } from '../profileSkeleton.tsx';

export const PostWrapper = () => {
  const { post, isLoading } = usePost();

  if (isLoading && !post) return <ProfileSkeleton />;
  if (!post) return <h2>This post doesn't exist.</h2>;

  return <Post {...post} isFullPost />;
};
