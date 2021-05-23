import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import { Image } from '../image';
import { AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

type ProfileItemProps = {
  countLikes: number;
  countComments: number;
  url: string;
  className?: string;
};

export const ProfileItem = ({
  countLikes,
  countComments,
  url,
  className,
}: ProfileItemProps) => {
  return (
    <div className={cn(className)}>
      <Image src={url} isProfileImage />
      <div className={s.bg}>
        <ul className={s.list}>
          <li className={s.list__item}>
            <AiFillHeart />
            <span>{countLikes}</span>
          </li>
          <li className={s.list__item}>
            <FaComment />
            <span>{countComments}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
