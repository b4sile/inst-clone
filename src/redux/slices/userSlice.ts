import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Firebase from 'firebase/app';
import { RootState } from '..';

interface UserState {
  user: Firebase.User | null;
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
    setUser: (
      state,
      { payload: { user, isLoading } }: PayloadAction<UserState>
    ) => {
      state.user = user;
      state.isLoading = isLoading;
    },
  },
});

export const selectUser = ({ user }: RootState) => user.user;
export const selectUserIsLoading = ({ user }: RootState) => user.isLoading;

export const { setUser } = actions;

export default reducer;
