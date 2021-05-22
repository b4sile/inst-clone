import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fetchProfile } from '../thunks';
import { PhotoInterface } from './timelineSlice';
import { UserDataInterface } from './userSlice';

export type ProfileItemValueInterface = {
  user: UserDataInterface;
  posts: PhotoInterface[];
};

export type ProfileItemInterface = {
  [key: string]: ProfileItemValueInterface | undefined;
};

interface ProfileState {
  items: ProfileItemInterface;
  isLoading: boolean;
}

const initialState: ProfileState = {
  items: {},
  isLoading: false,
};

const { actions, reducer } = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setItems: (
      state,
      {
        payload,
      }: PayloadAction<{
        user: UserDataInterface;
        posts: PhotoInterface[];
      } | null>
    ) => {
      if (payload) state.items[payload.user.username] = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      if (payload) {
        state.items[payload.user.username] = payload;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });
  },
});

export const selectProfile =
  (username: string) =>
  ({ profile: { items } }: RootState) =>
    items[username];
export const selectIsLoading = ({ profile }: RootState) => profile.isLoading;

export const { setItems } = actions;

export default reducer;
