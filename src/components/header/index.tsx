import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '..';
import { ROUTES } from '../../constants/routes';
import { Search } from '../search';
import s from './style.module.scss';

export const Header = () => {
  return (
    <header>
      <div className={s.dummy}></div>
      <div className={s.wrapper}>
        <div className={s.container}>
          <Link to={`${ROUTES.DASHBOARD}`}>
            <img className={s.logo} src="images/logo.png" alt="Logo" />
          </Link>
          <Search />
          <Navigation />
        </div>
      </div>
    </header>
  );
};
