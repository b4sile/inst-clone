import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fetchProfile, fetchUpdateFollowing } from '../thunks';
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
    builder.addCase(fetchUpdateFollowing.fulfilled, (state, { meta }) => {
      const {
        arg: { profileId, method, userId },
      } = meta;
      const item = Object.values(state.items).find(
        (item) => item?.user.userId === profileId
      );
      if (item) {
        if (method === 'add') {
          item.user.followers.push(userId);
        } else {
          item.user.followers = item.user.followers.filter(
            (id) => id !== userId
          );
        }
      }
    });
  },
});

export const selectProfileUser =
  (username: string) =>
  ({ profile: { items } }: RootState) =>
    items[username]?.user;
export const selectProfilePosts =
  (username: string) =>
  ({ profile: { items } }: RootState) =>
    items[username]?.posts;
export const selectIsLoading = ({ profile }: RootState) => profile.isLoading;
export const selectCountProfilePosts =
  (username: string | undefined) =>
  ({ profile: { items } }: RootState) =>
    (username && items[username]?.posts.length) || 0;

export const { setItems } = actions;

export default reducer;
