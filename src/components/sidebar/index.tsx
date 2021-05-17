import React from 'react';
import cn from 'classnames';
import { Button, Suggestions, User } from '..';
import { selectUser } from '../../redux/slices/userSlice';
import { useAppSelector } from '../../hooks';
import s from './style.module.scss';
import { ROUTES } from '../../constants/routes';
import { Link } from 'react-router-dom';

type SidebarProps = { className?: string };

export const Sidebar = ({ className }: SidebarProps) => {
  const user = useAppSelector(selectUser);

  return (
    <aside className={cn(className)}>
      {user && (
        <User username={user.username} fullName={user.fullName} variant="big" />
      )}
      <div className={s.sugest}>
        <p>Suggestions For You</p>
        <Link to={`${ROUTES.EXPLORE_SUGGESTIONS}`}>
          <Button color="secondary" variant="outlined">
            See all
          </Button>
        </Link>
      </div>
      <Suggestions count={5} />
    </aside>
  );
};
