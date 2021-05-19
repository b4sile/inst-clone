import { selectUserId, selectUserDocId } from './../redux/slices/userSlice';
import {
  selectIsLoading,
  selectIsUserHaveEmptySuggestions,
} from './../redux/slices/suggestionsSlice';
import React from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { selectSuggestions } from '../redux/slices/suggestionsSlice';
import { fetchSuggestions, fetchUpdateFollowing } from '../redux/thunks';

export const useSuggestions = (count: number) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const isUserHaveEmptySuggestions = useAppSelector(
    selectIsUserHaveEmptySuggestions
  );
  const userDocId = useAppSelector(selectUserDocId);
  const suggestions = useAppSelector(selectSuggestions);
  const isLoading = useAppSelector(selectIsLoading);

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
    if (userId && isUserHaveEmptySuggestions) {
      dispatch(fetchSuggestions({ userId, count }));
    }
  }, [dispatch, count, isUserHaveEmptySuggestions, userId]);

  return { suggestions, isLoading, handleFollowUser };
};
