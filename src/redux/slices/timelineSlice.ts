import {
  fetchTimelinePosts,
  fetchUpdatePostComments,
  fetchUpdatePostLikes,
} from './../thunks/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UserDataInterface } from './userSlice';

export interface CommentInterface {
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
  isLiked: boolean;
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
    setItems: (state, { payload }: PayloadAction<PostInterface[]>) => {
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
    builder.addCase(fetchUpdatePostLikes.fulfilled, (state, { meta }) => {
      const docId = meta.arg.docId;
      const userId = meta.arg.userId;
      const method = meta.arg.method;
      const photo = state.items.find((item) => item.docId === docId);

      if (photo) {
        photo.isLiked = !photo.isLiked;
        if (method === 'add') photo.likes.push(userId);
        else {
          photo.likes = photo.likes.filter((id) => id !== userId);
        }
      }
    });
    builder.addCase(fetchUpdatePostComments.fulfilled, (state, { meta }) => {
      const docId = meta.arg.docId;
      const comment = meta.arg.comment;
      const photo = state.items.find((item) => item.docId === docId);

      if (photo) {
        photo.comments.push(comment);
      }
    });
  },
});

export const selectTimelineItems = ({ timeline: { items } }: RootState) =>
  items;
export const selectIsLoading = ({ timeline: { isLoading } }: RootState) =>
  isLoading;
export const selectPost =
  (docId: string) =>
  ({ timeline: { items } }: RootState) =>
    items.find((item) => item.docId === docId);

export const { setItems } = actions;

export default reducer;
