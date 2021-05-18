import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { Button, User } from '..';

type SuggestionProps = {
  profileId: string;
  username: string;
  profileDocId: string;
  handleFollowUser: (
    profileDocId: string,
    profileId: string,
    method: 'add' | 'remove'
  ) => void;
  isFollow: boolean;
  isLoading: boolean;
  className?: string;
};

export const Suggestion = React.memo(
  ({
    profileId,
    username,
    profileDocId,
    handleFollowUser,
    isFollow,
    isLoading,
    className,
  }: SuggestionProps) => {
    return (
      <div className={cn(s.suggest, className)}>
        <User username={username} tag="popular" />
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
