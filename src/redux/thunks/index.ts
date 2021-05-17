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
