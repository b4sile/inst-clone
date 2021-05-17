import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fetchUserById } from '../thunks';

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
}

const initialState: UserState = {
  user: null,
  isLoading: true,
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
  },
});

export const selectUser = ({ user }: RootState) => user.user;
export const selectIsLoading = ({ user }: RootState) => user.isLoading;

export const { setUser, setIsLoading } = actions;

export default reducer;
