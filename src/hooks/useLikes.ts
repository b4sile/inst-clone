import React from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { selectUserId } from '../redux/slices/userSlice';
import { fetchUpdatePostLikes } from '../redux/thunks';

export const useLikes = (docId: string, isLiked: boolean) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);

  const handleUpdateLikes = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userId) {
      dispatch(
        fetchUpdatePostLikes({
          userId,
          docId,
          method: isLiked ? 'remove' : 'add',
        })
      );
    }
  };

  return handleUpdateLikes;
};
