import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { selectIsLoading, selectProfile } from '../redux/slices/profileSlice';
import { selectUserId } from '../redux/slices/userSlice';
import { fetchProfile } from '../redux/thunks';

export const useProfile = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const profile = useAppSelector(selectProfile(username));
  const isLoading = useAppSelector(selectIsLoading);

  console.log('render profile');
  console.log(profile);

  React.useEffect(() => {
    dispatch(fetchProfile(username));
  }, [dispatch]);

  return { profile, isLoading };
};
