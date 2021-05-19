import React from 'react';
import { Suggestions } from '../suggestions';
import s from './style.module.scss';

export const ExploreSuggestions = () => {
  return (
    <div className={s.container}>
      <h2 className={s.header}>Suggested</h2>
      <div className={s.wrapper}>
        <Suggestions variant="middle" count={15} />
      </div>
    </div>
  );
};
