import { selectIsLoading } from './../redux/slices/suggestionsSlice';
import React from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { selectSuggestions } from '../redux/slices/suggestionsSlice';
import { selectUser } from '../redux/slices/userSlice';
import { fetchSuggestions } from '../redux/thunks';

export const useSuggestions = (count: number) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const suggestions = useAppSelector(selectSuggestions);
  const isLoading = useAppSelector(selectIsLoading);

  React.useEffect(() => {
    if (user) {
      const { following, userId } = user;
      dispatch(fetchSuggestions({ userId, count, following }));
    }
  }, [dispatch, user, count]);

  return { suggestions, isLoading };
};
