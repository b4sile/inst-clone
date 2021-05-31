import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { selectUserId, selectUserUsername } from '../redux/slices/userSlice';
import { fetchAddUserPost } from '../redux/thunks';

export const useUploadPhoto = () => {
  const { state } = useLocation<{ file: File } | null>();
  const [preview, setPreview] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const userId = useAppSelector(selectUserId);
  const username = useAppSelector(selectUserUsername);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const handleAddPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (message !== '' && userId && username && state) {
      setIsLoading(true);
      const postData = {
        userId,
        comments: [],
        dateCreated: Date.now(),
        likes: [],
        caption: message,
      };
      const response = await dispatch(
        fetchAddUserPost({ username, file: state.file, postData })
      );
      setIsLoading(false);
      setMessage('');
      if (response.meta.requestStatus === 'fulfilled') {
        history.push(`/p/${response.payload as string}`);
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPost(e);
    }
  };

  React.useEffect(() => {
    if (!state) {
      setPreview('');
      return;
    }
    const objectUrl = URL.createObjectURL(state.file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
      setPreview(null);
    };
  }, [state]);

  return {
    state,
    preview,
    setMessage,
    message,
    isLoading,
    handleAddPost,
    onKeyDown,
    isSmallScreen,
  };
};
