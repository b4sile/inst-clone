import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';

export const useUploadPhoto = () => {
  const { state } = useLocation<{ file: File } | null>();
  const [preview, setPreview] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
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
  };
};
