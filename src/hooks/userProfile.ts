import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import {
  selectCountProfilePosts,
  selectIsLoading,
  selectProfileUser,
} from '../redux/slices/profileSlice';
import {
  selectIsUserFollowing,
  selectUserDocId,
  selectUserId,
} from '../redux/slices/userSlice';
import { fetchProfile, fetchUpdateFollowing } from '../redux/thunks';

export const useProfile = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const profileUser = useAppSelector(selectProfileUser(username));
  const isLoading = useAppSelector(selectIsLoading);
  const userDocId = useAppSelector(selectUserDocId);
  const isUserFollowing = useAppSelector(
    selectIsUserFollowing(profileUser?.userId)
  );
  const countProfilePosts = useAppSelector(
    selectCountProfilePosts(profileUser?.username)
  );

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
    dispatch(fetchProfile(username));
  }, [dispatch, username]);

  return {
    profileUser,
    isLoading,
    userId,
    isUserFollowing,
    countProfilePosts,
    handleFollowUser,
  };
};
