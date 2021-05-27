import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, Navigation } from '..';
import { ROUTES, VALUES } from '../../constants/routes';
import { MobileNav } from '../navigation/MobileNav';
import { Search } from '../search';
import s from './style.module.scss';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const Header = React.memo(() => {
  const isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)',
  });
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <header className={s.header}>
      <div className={s.dummy}></div>
      <div className={s.wrapper}>
        <div className={s.container}>
          {isSmallScreen &&
            (pathname !== ROUTES.DASHBOARD ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => history.goBack()}
                className={s.btn}
              >
                <AiOutlineArrowLeft />
              </Button>
            ) : (
              <div style={{ width: '44px' }}></div>
            ))}
          <Link to={`${ROUTES.DASHBOARD}`} className={s.logo__link}>
            <img className={s.logo} src={`${VALUES.LOGO}`} alt="Logo" />
          </Link>
          <Search />
          {!isSmallScreen ? <Navigation /> : <MobileNav />}
        </div>
      </div>
    </header>
  );
});
