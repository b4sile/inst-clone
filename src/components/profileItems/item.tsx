import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import { Image } from '../image';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

type ProfileItemProps = {
  countLikes: number;
  countComments: number;
  url: string;
  docId: string;
  className?: string;
};

export const ProfileItem = ({
  countLikes,
  countComments,
  url,
  docId,
  className,
}: ProfileItemProps) => {
  const location = useLocation();
  const isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)',
  });

  return (
    <div className={cn(className)}>
      <Link
        to={{
          pathname: `/p/${docId}`,
          state: { background: !isSmallScreen ? location : undefined },
        }}
      >
        <Image src={url} isProfileImage />
        <div className={s.bg}>
          <ul className={s.list}>
            <li className={s.list__item}>
              <AiFillHeart />
              <span className={s.value}>{countLikes}</span>
            </li>
            <li className={s.list__item}>
              <FaComment />
              <span className={s.value}>{countComments}</span>
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
};
