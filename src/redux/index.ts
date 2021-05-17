import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import suggestionsReducer from './slices/suggestionsSlice';

export const store = configureStore({
  reducer: { user: userReducer, suggestions: suggestionsReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
