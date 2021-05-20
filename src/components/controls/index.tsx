import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { Button } from '..';

type ControlsProps = { countLikes: number; date?: string; className?: string };

export const Controls = ({ countLikes, date, className }: ControlsProps) => {
  return (
    <div className={cn(s.container, className)}>
      <div className={s.icons}>
        <button>
          <AiOutlineHeart />
        </button>
        <button>
          <FaRegComment />
        </button>
      </div>
      <p className={s.likes}>{countLikes} likes</p>
      {date && <p className={s.date}>{date}</p>}
    </div>
  );
};
