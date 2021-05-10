import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Firebase from 'firebase/app';
import { RootState } from '..';
import { getUserFromLocalStorage } from '../../helpers';

interface UserState {
  user: Firebase.User | null;
}

const initialState: UserState = { user: getUserFromLocalStorage() };

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<Firebase.User | null>) => {
      state.user = payload;
    },
  },
});

export const selectUser = ({ user }: RootState) => user.user;

export const { setUser } = actions;

export default reducer;
