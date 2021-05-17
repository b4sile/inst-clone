import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fetchSuggestions } from '../thunks';
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
    setItems: (state, { payload }) => {
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
  },
});

export const { setItems } = actions;

export const selectSuggestions = ({ suggestions: { items } }: RootState) =>
  items;
export const selectIsLoading = ({ suggestions: { isLoading } }: RootState) =>
  isLoading;

export default reducer;
