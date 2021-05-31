import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '.';
import { selectUserUsername } from '../redux/slices/userSlice';
import { fetchDeleteUserPost } from '../redux/thunks';

export const useModalButton = (
  username: string,
  docId: string,
  imageSrc: string
) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const currentUserUsername = useAppSelector(selectUserUsername);
  const [isLoading, setIsLoading] = React.useState(false);
  const isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)',
  });
  const history = useHistory();

  const handleCloseModal = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentUserUsername) {
      setIsLoading(true);
      const response = await dispatch(
        fetchDeleteUserPost({
          username: currentUserUsername,
          docId,
          url: imageSrc,
        })
      );
      setIsLoading(false);
      setIsOpen(false);
      if (response.meta.requestStatus === 'fulfilled') {
        history.push(`/${currentUserUsername}`);
      }
    }
  };

  const isCurrentUserPost = username === currentUserUsername;

  return {
    setIsOpen,
    isLoading,
    modalIsOpen,
    handleCloseModal,
    isSmallScreen,
    isCurrentUserPost,
    handleDeletePost,
  };
};
