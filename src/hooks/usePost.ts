import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { selectIsLoading, selectPostById } from '../redux/slices/postSlice';
import { fetchPostById } from '../redux/thunks';

export const usePost = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPostById(id));
  const isLoading = useAppSelector(selectIsLoading);

  console.log(id);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  return { post, isLoading };
};
