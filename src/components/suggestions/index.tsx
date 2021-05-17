import React from 'react';
import cn from 'classnames';
import { useSuggestions } from '../../hooks/useSuggestions';
import { Button, User } from '..';
import s from './style.module.scss';
import Skeleton from 'react-loading-skeleton';

type SuggestionsProps = { count: number; className?: string };

export const Suggestions = React.memo(
  ({ count, className }: SuggestionsProps) => {
    const { suggestions, isLoading } = useSuggestions(count);

    return (
      <section className={cn(className)}>
        {suggestions.length || !isLoading ? (
          suggestions.map(({ userId, username }) => (
            <article className={s.suggest} key={userId}>
              <User username={username} tag="popular" />
              <Button variant="outlined">Follow</Button>
            </article>
          ))
        ) : (
          <Skeleton count={count} height={40} />
        )}
      </section>
    );
  }
);
