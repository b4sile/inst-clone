import React from 'react';
import { useProfile } from '../../hooks/userProfile';
import s from './style.module.scss';
import cn from 'classnames';
import { Avatar } from '..';

type ProfileProps = { className?: string };

export const Profile = ({ className }: ProfileProps) => {
  const { profile, isLoading } = useProfile();

  if (isLoading) return <h2>Loading...</h2>;
  if (!profile) return <h2>This user doesn't exist.</h2>;

  const { user, posts } = profile;

  return (
    <div className={cn(s.container, className)}>
      <section className={s.top}>
        <div className={s.left}>
          <Avatar size={150} />
        </div>
        <div className={s.right}>
          <h1>{user.username}</h1>
        </div>
      </section>
    </div>
  );
};
