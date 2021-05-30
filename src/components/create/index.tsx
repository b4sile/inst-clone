import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUploadPhoto } from '../../hooks/useUploadPhoto';
import { Image } from '../image';
import s from './style.module.scss';
import TextareaAutosize from 'react-textarea-autosize';
import cn from 'classnames';
import { Button } from '..';

export const Create = () => {
  const {
    preview,
    state,
    message,
    setMessage,
    isLoading,
    handleAddPost,
    onKeyDown,
  } = useUploadPhoto();

  if (!state) return <Redirect to="/" />;

  return (
    <div>
      <h1 className={s.title}>New Post</h1>
      {preview && <Image src={preview} alt="Preview" className={s.img} />}
      <div className={cn(s.container)}>
        <form onSubmit={handleAddPost}>
          <TextareaAutosize
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
            onKeyDown={onKeyDown}
            placeholder="Add a title..."
            className={s.textarea}
          />
          <Button
            className={s.btn}
            variant="outlined"
            type="submit"
            disabled={message === '' || isLoading}
            isLoading={isLoading}
          >
            Share
          </Button>
        </form>
      </div>
    </div>
  );
};
