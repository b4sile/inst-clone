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
import {
  fetchProfile,
  fetchUpdateFollowing,
  fetchUpdateUserAvatar,
} from '../redux/thunks';

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

  const onChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files && e.target.files[0];
    const url = profileUser?.avatarUrl || null;
    if (file && userDocId)
      dispatch(
        fetchUpdateUserAvatar({ docId: userDocId, username, file, url })
      );
  };

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
    onChangeAvatar,
  };
};
