import { fetchTimelinePosts } from './../thunks/index';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UserDataInterface } from './userSlice';

interface CommentInterface {
  comment: string;
  displayName: string;
}

export interface PhotoInterface {
  caption: string;
  comments: CommentInterface[];
  dateCreated: number;
  imageSrc: string;
  likes: string[];
  photoId: number;
  userId: string;
  userLatitude: string;
  userLongitude: string;
  docId: string;
}

export interface PostInterface extends PhotoInterface {
  user: UserDataInterface;
}

interface TimelineState {
  items: PostInterface[];
  isLoading: boolean;
}

const initialState: TimelineState = {
  items: [],
  isLoading: false,
};

const { actions, reducer } = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    setItems: (state, { payload }) => {
      state.items = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTimelinePosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTimelinePosts.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTimelinePosts.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });
  },
});

export const selectTimelineItems = ({ timeline: { items } }: RootState) =>
  items;
export const selectIsLoading = ({ timeline: { isLoading } }: RootState) =>
  isLoading;

export const { setItems } = actions;

export default reducer;
