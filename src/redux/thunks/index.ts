import {
  updateUserFollowers,
  updateUserFollowing,
} from './../../services/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSuggestions, getUserById } from '../../services/firebase';

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (userId: string) => {
    return await getUserById(userId);
  }
);

export type FetchSuggestionsParams = {
  userId: string;
  count: number;
  following: string[];
};

export const fetchSuggestions = createAsyncThunk(
  'suggestions/fetch',
  async ({ userId, count, following }: FetchSuggestionsParams) => {
    return await getSuggestions(userId, count, following);
  }
);

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
