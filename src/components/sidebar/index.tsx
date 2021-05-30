import React from 'react';
import cn from 'classnames';
import { Button, Suggestions, User } from '..';
import {
  selectUserAvatar,
  selectUserFullName,
  selectUserUsername,
} from '../../redux/slices/userSlice';
import { useAppSelector } from '../../hooks';
import s from './style.module.scss';
import { ROUTES } from '../../constants/routes';
import { Link } from 'react-router-dom';

type SidebarProps = { className?: string };

export const Sidebar = React.memo(({ className }: SidebarProps) => {
  const username = useAppSelector(selectUserUsername);
  const fullName = useAppSelector(selectUserFullName);
  const avatarUrl = useAppSelector(selectUserAvatar);

  return (
    <aside className={cn(s.aside, className)}>
      {username && fullName && (
        <User
          username={username}
          fullName={fullName}
          {...(avatarUrl ? { avatarUrl } : {})}
          variant="big"
        />
      )}
      <div className={s.sugest}>
        <p>Suggestions For You</p>
        <Link to={`${ROUTES.EXPLORE_SUGGESTIONS}`}>
          <Button color="secondary" variant="outlined">
            See all
          </Button>
        </Link>
      </div>
      <Suggestions className={s.suggestions} count={5} />
    </aside>
  );
});
