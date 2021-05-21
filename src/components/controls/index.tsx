import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { useLikes } from '../../hooks/useLikes';
import formatDistance from 'date-fns/formatDistance';

type ControlsProps = {
  countLikes: number;
  docId: string;
  isLiked: boolean;
  date?: number;
  className?: string;
};

export const Controls = React.memo(
  ({ countLikes, isLiked, date, docId, className }: ControlsProps) => {
    const handleUpdateLikes = useLikes(docId, isLiked);

    return (
      <div className={cn(s.container, className)}>
        <div className={s.icons}>
          <button onClick={handleUpdateLikes}>
            {isLiked ? (
              <AiFillHeart className={s.heart} color="#ED4956" />
            ) : (
              <AiOutlineHeart className={s.heart} />
            )}
          </button>
          <button>
            <FaRegComment />
          </button>
        </div>
        <p className={s.likes}>{countLikes} likes</p>
        {date && (
          <p className={s.date}>
            {formatDistance(date, new Date(), { addSuffix: true })}
          </p>
        )}
      </div>
    );
  }
);
