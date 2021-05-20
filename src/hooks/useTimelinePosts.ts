import React from 'react';
import { useAppDispatch, useAppSelector } from '.';
import {
  selectIsLoading,
  selectTimelineItems,
} from '../redux/slices/timelineSlice';
import { selectUserId } from '../redux/slices/userSlice';
import { fetchTimelinePosts } from '../redux/thunks';

export const useTimelinePosts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectTimelineItems);
  const isLoading = useAppSelector(selectIsLoading);
  const userId = useAppSelector(selectUserId);

  React.useEffect(() => {
    if (userId) {
      dispatch(fetchTimelinePosts());
    }
  }, [dispatch, userId]);

  return [posts, isLoading] as const;
};
