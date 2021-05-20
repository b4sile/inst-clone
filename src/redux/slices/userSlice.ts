import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fetchUpdateFollowing, fetchUserById } from '../thunks';

export interface UserDataInterface {
  docId: string;
  fullName: string;
  username: string;
  userId: string;
  emailAddress: string;
  followers: string[];
  following: string[];
  dateCreated: number;
}
interface UserState {
  user: UserDataInterface | null;
  isLoading: boolean;
  followingIds: string[];
}

const initialState: UserState = {
  user: null,
  isLoading: true,
  followingIds: [],
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserDataInterface | null>) => {
      state.user = payload;
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserById.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });
    builder.addCase(fetchUpdateFollowing.pending, (state, { meta }) => {
      state.followingIds.push(meta.arg.profileId);
    });
    builder.addCase(fetchUpdateFollowing.fulfilled, (state, { meta }) => {
      const {
        arg: { profileId, method },
      } = meta;
      if (method === 'add') {
        state.user?.following.push(profileId);
      } else {
        if (state.user) {
          state.user.following = state.user?.following.filter(
            (id) => id !== profileId
          );
        }
      }
      state.followingIds = state.followingIds.filter((id) => id !== profileId);
    });
    builder.addCase(fetchUpdateFollowing.rejected, (state, { error, meta }) => {
      state.followingIds = state.followingIds.filter(
        (id) => id !== meta.arg.profileId
      );
      console.log(error);
    });
  },
});

export const selectUserUsername = ({ user: { user } }: RootState) =>
  user && user.username;
export const selectUserFullName = ({ user: { user } }: RootState) =>
  user && user.fullName;
export const selectUserFollowing = ({ user: { user } }: RootState) =>
  user && user.following;
export const selectUserId = ({ user: { user } }: RootState) =>
  user && user.userId;
export const selectUserDocId = ({ user: { user } }: RootState) =>
  user && user.docId;
export const selectUser = ({ user }: RootState) => user.user;
export const selectIsLoading = ({ user }: RootState) => user.isLoading;
export const selectIsUserFollowed =
  (profileId: string) =>
  ({ user: { user } }: RootState) =>
    (user && user.following.includes(profileId)) || false;
export const selectIsUserFollowing =
  (profileId: string) =>
  ({ user: { followingIds } }: RootState) =>
    followingIds.includes(profileId) || false;

export const { setUser, setIsLoading } = actions;

export default reducer;
