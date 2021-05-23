import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import suggestionsReducer from './slices/suggestionsSlice';
import timelineReducer from './slices/timelineSlice';
import profileReducer from './slices/profileSlice';
import postReducer from './slices/postSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    suggestions: suggestionsReducer,
    timeline: timelineReducer,
    profile: profileReducer,
    post: postReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
