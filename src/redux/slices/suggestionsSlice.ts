import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fetchSuggestions, fetchUpdateFollowing } from '../thunks';
import { UserDataInterface } from './userSlice';

interface SuggestionsState {
  items: UserDataInterface[];
  isLoading: boolean;
}

const initialState: SuggestionsState = {
  items: [],
  isLoading: false,
};

const { actions, reducer } = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setItems: (state, { payload }: PayloadAction<UserDataInterface[]>) => {
      state.items = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSuggestions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSuggestions.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchSuggestions.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });
    builder.addCase(fetchUpdateFollowing.fulfilled, (state, { meta }) => {
      const method = meta.arg.method;
      const profileId = meta.arg.profileId;
      const userId = meta.arg.userId;

      const profile = state.items.find((prof) => prof.userId === profileId);

      if (profile) {
        if (method === 'add') profile.followers.push(userId);
        else {
          profile.followers = profile.followers.filter(
            (followId) => followId !== userId
          );
        }
      }
    });
  },
});

export const { setItems } = actions;

export const selectIsUserHaveEmptySuggestions = ({
  suggestions: { items },
}: RootState) => items.length === 0;
export const selectSuggestions = ({ suggestions: { items } }: RootState) =>
  items;
export const selectIsLoading = ({ suggestions: { isLoading } }: RootState) =>
  isLoading;

export default reducer;
