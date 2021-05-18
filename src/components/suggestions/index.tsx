import React from 'react';
import cn from 'classnames';
import { useSuggestions } from '../../hooks/useSuggestions';
import Skeleton from 'react-loading-skeleton';
import { Suggestion } from '../suggestion';

type SuggestionsProps = { count: number; className?: string };

export const Suggestions = ({ count, className }: SuggestionsProps) => {
  const { suggestions, isLoading, handleFollowUser, isFollow, followingIds } =
    useSuggestions(count);

  return (
    <section className={cn(className)}>
      {suggestions.length || !isLoading ? (
        suggestions.map(({ userId, username, docId }) => (
          <Suggestion
            key={userId}
            username={username}
            profileId={userId}
            profileDocId={docId}
            handleFollowUser={handleFollowUser}
            isFollow={isFollow(userId)}
            isLoading={followingIds.includes(userId)}
          />
        ))
      ) : (
        <Skeleton count={count} height={40} />
      )}
    </section>
  );
};
