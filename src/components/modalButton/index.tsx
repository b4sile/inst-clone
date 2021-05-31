import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Button } from '..';
import cn from 'classnames';
import Modal from 'react-modal';
import s from './style.module.scss';
import { useModalButton } from '../../hooks/useModalButton';

type ModalButtonProps = {
  docId: string;
  username: string;
  imageSrc: string;
  className?: string;
};

export const ModalButton = React.memo(
  ({ username, docId, imageSrc, className }: ModalButtonProps) => {
    const {
      setIsOpen,
      isLoading,
      modalIsOpen,
      handleCloseModal,
      isSmallScreen,
      isCurrentUserPost,
      handleDeletePost,
    } = useModalButton(username, docId, imageSrc);

    return (
      <div className={cn(className)}>
        <Button
          onClick={() => setIsOpen(true)}
          variant="outlined"
          color="secondary"
          className={s.btn}
        >
          <BsThreeDots />
        </Button>
        <Modal
          appElement={document.getElementById('root') as HTMLElement}
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 5001,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            content: {
              padding: '0px',
              overflow: 'hidden',
              border: 'none',
              borderRadius: '12px',
              inset: 'unset',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '400px',
              width: !isSmallScreen ? '100%' : '90%',
            },
          }}
        >
          {isCurrentUserPost && (
            <Button
              className={cn(s.btn, s.delete)}
              variant="outlined"
              color="secondary"
              onClick={handleDeletePost}
              disabled={isLoading}
              isLoading={isLoading}
            >
              Delete
            </Button>
          )}
          <Button
            onClick={() => setIsOpen(false)}
            className={s.btn}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </Modal>
      </div>
    );
  }
);
