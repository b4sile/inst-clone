import { fetchUpdatePostComments } from './../redux/thunks/index';
import React from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { selectUserUsername } from '../redux/slices/userSlice';

export const useAddComment = (docId: string) => {
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUserUsername);

  const handleAddComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (username && message !== '') {
      setIsLoading(true);
      await dispatch(
        fetchUpdatePostComments({
          docId,
          comment: { displayName: username, comment: message },
        })
      );
      setMessage('');
      setIsLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddComment(e);
    }
  };

  return { handleAddComment, message, setMessage, isLoading, onKeyDown };
};
