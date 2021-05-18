import {
  selectUserId,
  selectUserFollowind,
  selectUserDocId,
} from './../redux/slices/userSlice';
import { selectIsLoading } from './../redux/slices/suggestionsSlice';
import React from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { selectSuggestions } from '../redux/slices/suggestionsSlice';
import { selectFollowingIds } from '../redux/slices/userSlice';
import { fetchSuggestions, fetchUpdateFollowing } from '../redux/thunks';

export const useSuggestions = (count: number) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const following = useAppSelector(selectUserFollowind);
  const userDocId = useAppSelector(selectUserDocId);
  const suggestions = useAppSelector(selectSuggestions);
  const isLoading = useAppSelector(selectIsLoading);
  const followingIds = useAppSelector(selectFollowingIds);

  const isFollow = (profileId: string) =>
    following?.includes(profileId) || false;

  const handleFollowUser = React.useCallback(
    async (
      profileDocId: string,
      profileId: string,
      method: 'add' | 'remove'
    ) => {
      if (userId && userDocId) {
        dispatch(
          fetchUpdateFollowing({
            userId,
            userDocId,
            profileId,
            profileDocId,
            method,
          })
        );
      }
    },
    [dispatch, userId, userDocId]
  );

  React.useEffect(() => {
    if (userId && following && !suggestions.length) {
      dispatch(fetchSuggestions({ userId, count, following }));
    }
  }, [dispatch]);

  return { suggestions, isLoading, handleFollowUser, isFollow, followingIds };
};
