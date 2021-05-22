import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '..';
import { useAddComment } from '../../hooks/useAddComment';

type CommentInputProps = { docId: string; className?: string };

export const CommentInput = ({ docId, className }: CommentInputProps) => {
  const { handleAddComment, message, setMessage, isLoading, onKeyDown } =
    useAddComment(docId);

  return (
    <div className={cn(s.container, className)}>
      <form onSubmit={handleAddComment}>
        <TextareaAutosize
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          onKeyDown={onKeyDown}
          placeholder="Add a comment..."
          className={s.textarea}
        />
        <Button
          className={s.btn}
          variant="outlined"
          type="submit"
          disabled={message === '' || isLoading}
          isLoading={isLoading}
        >
          Post
        </Button>
      </form>
    </div>
  );
};
