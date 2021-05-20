import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from '..';

type CommentInputProps = { className?: string };

export const CommentInput = ({ className }: CommentInputProps) => {
  return (
    <div className={cn(s.container, className)}>
      <TextareaAutosize placeholder="Add a comment..." className={s.textarea} />
      <Button className={s.btn} variant="outlined">
        Post
      </Button>
    </div>
  );
};
