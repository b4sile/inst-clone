import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { Button, User } from '..';
import { useAppSelector } from '../../hooks';
import {
  selectIsUserFollowed,
  selectIsUserFollowing,
} from '../../redux/slices/userSlice';

type SuggestionProps = {
  profileId: string;
  username: string;
  profileDocId: string;
  handleFollowUser: (
    profileDocId: string,
    profileId: string,
    method: 'add' | 'remove'
  ) => void;
  fullName?: string;
  variant?: 'small' | 'middle';
  className?: string;
};

export const Suggestion = React.memo(
  ({
    profileId,
    username,
    profileDocId,
    handleFollowUser,
    variant,
    fullName,
    className,
  }: SuggestionProps) => {
    const isFollow = useAppSelector(selectIsUserFollowed(profileId));
    const isLoading = useAppSelector(selectIsUserFollowing(profileId));

    return (
      <div className={cn(s.suggest, className)}>
        <User
          username={username}
          variant={variant}
          {...(variant === 'middle' ? { fullName } : {})}
          tag="popular"
        />
        <Button
          onClick={() =>
            handleFollowUser(
              profileDocId,
              profileId,
              isFollow ? 'remove' : 'add'
            )
          }
          variant={isFollow ? 'contained' : 'outlined'}
          color={isFollow ? 'secondary' : 'primary'}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isFollow ? 'UnFollow' : 'Follow'}
        </Button>
      </div>
    );
  }
);
