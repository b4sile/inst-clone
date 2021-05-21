import {
  getPhotosForTimeline,
  updateUserFollowers,
  updateUserFollowing,
  updatePostLikes,
  updatePostComments,
} from './../../services/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSuggestions, getUserById } from '../../services/firebase';
import { UserDataInterface } from '../slices/userSlice';
import { RootState } from '..';
import { CommentInterface, PostInterface } from '../slices/timelineSlice';

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (userId: string) => {
    return await getUserById(userId);
  }
);

export type FetchSuggestionsParams = {
  userId: string;
  count: number;
};

export const fetchSuggestions = createAsyncThunk<
  UserDataInterface[],
  FetchSuggestionsParams,
  { state: RootState }
>('suggestions/fetch', async ({ count, userId }, { getState }) => {
  const following = getState().user.user!.following;
  return await getSuggestions(userId, count, following);
});

export type FetchUpdateFollowing = {
  profileDocId: string;
  profileId: string;
  userDocId: string;
  userId: string;
  method: 'add' | 'remove';
};

export const fetchUpdateFollowing = createAsyncThunk(
  'user/updateFollowing',
  async ({
    userDocId,
    profileId,
    profileDocId,
    method,
    userId,
  }: FetchUpdateFollowing) => {
    await Promise.all([
      updateUserFollowing(userDocId, profileId, method),
      updateUserFollowers(profileDocId, userId, method),
    ]);
  }
);

export const fetchTimelinePosts = createAsyncThunk<
  PostInterface[],
  string,
  { state: RootState }
>('timeline/fetchPosts', async (userId, { getState }) => {
  const following = getState().user.user?.following;

  if (!following || !following.length) return [];
  return await getPhotosForTimeline(following, userId);
});

export type FetchUpdatePostLikes = {
  method: 'add' | 'remove';
  docId: string;
  userId: string;
};

export const fetchUpdatePostLikes = createAsyncThunk<
  void,
  FetchUpdatePostLikes,
  { state: RootState }
>('timeline/updatePostLikes', async ({ docId, userId, method }) => {
  return await updatePostLikes(docId, userId, method);
});

export type FetchUpdatePostComments = {
  comment: CommentInterface;
  docId: string;
};

export const fetchUpdatePostComments = createAsyncThunk<
  void,
  FetchUpdatePostComments,
  { state: RootState }
>('timeline/updatePostLikes', async ({ docId, comment }) => {
  return await updatePostComments(docId, comment);
});
