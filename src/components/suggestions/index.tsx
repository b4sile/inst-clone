import React from 'react';
import cn from 'classnames';
import { useSuggestions } from '../../hooks/useSuggestions';
import Skeleton from 'react-loading-skeleton';
import { Suggestion } from '../suggestion';

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
        : Array.from({ length: count }, (_, ind) => (
            <div key={ind} style={{ display: 'flex', marginTop: '10px' }}>
              <Skeleton width={32} height={32} circle />
              <div
                style={{
                  marginLeft: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Skeleton
                  style={{ marginBottom: '5px' }}
                  height={15}
                  width={100}
                />
                <Skeleton height={12} width={55} />
              </div>
            </div>
          ))}
    </section>
  );
};
