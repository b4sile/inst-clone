import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
  ThunkAction,
} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import suggestionsReducer from './slices/suggestionsSlice';
import timelineReducer from './slices/timelineSlice';
import profileReducer from './slices/profileSlice';
import postReducer from './slices/postSlice';

const combinedReducer = combineReducers({
  user: userReducer,
  suggestions: suggestionsReducer,
  timeline: timelineReducer,
  profile: profileReducer,
  post: postReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'user/logout') {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
