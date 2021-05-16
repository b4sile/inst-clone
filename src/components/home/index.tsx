import React from 'react';
import { Sidebar, Timeline } from '..';
import s from './style.module.scss';

const Home = () => {
  return (
    <div className={s.container}>
      <Timeline className={s.left} />
      <Sidebar className={s.right} />
    </div>
  );
};

export default Home;
