import React from 'react';
import cn from 'classnames';
import s from './style.module.scss';
import { useProfileItems } from '../../hooks/useProfileItems';
import { ProfileItem } from './item';

type ProfileItemsProps = { username: string; className?: string };

export const ProfileItems = ({ username, className }: ProfileItemsProps) => {
  const { posts } = useProfileItems(username);

  return (
    <div className={cn(s.container, className)}>
      {posts &&
        posts.map(({ imageSrc, comments, likes, photoId }) => (
          <ProfileItem
            className={s.item}
            key={imageSrc}
            countLikes={likes.length}
            countComments={comments.length}
            url={imageSrc}
            photoId={photoId}
          />
        ))}
    </div>
  );
};
