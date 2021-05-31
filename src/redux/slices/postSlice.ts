import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import {
  fetchDeleteUserPost,
  fetchPostById,
  fetchUpdatePostComments,
  fetchUpdatePostLikes,
} from '../thunks';
import { PostInterface } from './timelineSlice';

export type PostItemInterface = {
  [key: string]: PostInterface | undefined;
};

interface PostState {
  items: PostItemInterface;
  isLoading: boolean;
}

const initialState: PostState = {
  items: {},
  isLoading: false,
};

const { reducer } = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPostById.fulfilled, (state, { payload }) => {
      if (payload)
        state.items[payload.post.docId] = {
          ...payload.post,
          user: payload.user,
        };
      state.isLoading = false;
    });
    builder.addCase(fetchPostById.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });
    builder.addCase(fetchUpdatePostLikes.fulfilled, (state, { meta }) => {
      const docId = meta.arg.docId;
      const userId = meta.arg.userId;
      const method = meta.arg.method;
      const photo = Object.values(state.items).find(
        (item) => item?.docId === docId
      );
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
      const photo = Object.values(state.items).find(
        (item) => item && item.docId === docId
      );

      if (photo) {
        photo.comments.push(comment);
      }
    });
    builder.addCase(fetchDeleteUserPost.fulfilled, (state, { meta }) => {
      const docId = meta.arg.docId;
      delete state.items[docId];
    });
  },
});

export const selectPostById =
  (id: string) =>
  ({ post: { items } }: RootState) =>
    items[id];
export const selectIsLoading = ({ post }: RootState) => post.isLoading;

export default reducer;
