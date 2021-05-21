import React from 'react';
import cn from 'classnames';
import { useSuggestions } from '../../hooks/useSuggestions';
import { Suggestion } from '../suggestion';
import { UserSkeleton } from '../userSkeleton';

type SuggestionsProps = {
  count: number;
  variant?: 'small' | 'middle';
  className?: string;
};

export const Suggestions = ({
  count,
  variant = 'small',
  className,
}: SuggestionsProps) => {
  const { suggestions, handleFollowUser, isLoading } = useSuggestions(count);

  return (
    <section className={cn(className)}>
      {suggestions.length || !isLoading
        ? suggestions.map(({ userId, username, docId, fullName }) => (
            <Suggestion
              key={userId}
              username={username}
              profileId={userId}
              profileDocId={docId}
              handleFollowUser={handleFollowUser}
              variant={variant}
              fullName={fullName}
            />
          ))
        : Array.from({ length: count }, (_, ind) => <UserSkeleton key={ind} />)}
    </section>
  );
};
