import React from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { PostWrapper } from './PostWrapper';
import { GrClose } from 'react-icons/gr';
import s from './style.module.scss';
import { useMediaQuery } from 'react-responsive';

export const PostModal = () => {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const isLaptop = useMediaQuery({
    query: '(max-width: 895px)',
  });
  const isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const history = useHistory();

  const handleCloseModal = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    history.goBack();
  };

  return (
    <Modal
      appElement={document.getElementById('root') as HTMLElement}
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 5000,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          padding: '0px',
          overflow: 'hidden',
          border: 'none',
          borderRadius: '0px',
          maxWidth: '815px',
          inset: 'unset',
          height: isSmallScreen ? '80%' : 'auto',
          width: !isLaptop ? '100%' : `${(815 * 100) / 895}%`,
        },
      }}
    >
      <PostWrapper isModalPost />
      <GrClose onClick={handleCloseModal} className={s.modal__close} />
    </Modal>
  );
};
