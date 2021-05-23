import { selectProfilePosts } from './../redux/slices/profileSlice';
import React from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { selectUserId } from '../redux/slices/userSlice';

export const useProfileItems = (username: string) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const posts = useAppSelector(selectProfilePosts(username));

  // const handleUpdateLikes = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (userId) {
  //     dispatch(
  //       fetchUpdatePostLikes({
  //         userId,
  //         docId,
  //         method: isLiked ? 'remove' : 'add',
  //       })
  //     );
  //   }
  // };

  return { posts };
};
