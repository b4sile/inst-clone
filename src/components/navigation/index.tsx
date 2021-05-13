import React from 'react';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { FirebaseContext } from '../../context/firebase';
import { Menu } from '../menu';
import s from './style.module.scss';

export const Navigation = () => {
  const [isOpenUserMenu, setIsOpenUserMenu] = React.useState(false);
  const { pathname } = useLocation();
  const { firebase } = React.useContext(FirebaseContext);

  const onSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpenUserMenu(!isOpenUserMenu);
  };

  return (
    <div className={s.container}>
      <ul className={s.list}>
        <li>
          <Link className={s.link} to={`${ROUTES.DASHBOARD}`}>
            {pathname === `${ROUTES.DASHBOARD}` ? (
              <AiFillHome />
            ) : (
              <AiOutlineHome />
            )}
          </Link>
        </li>
        <li>
          <Link
            onClick={handleOpenUserMenu}
            className={s.link}
            to={`${ROUTES.PROFILE}`}
          >
            {pathname === `${ROUTES.PROFILE}` || isOpenUserMenu ? (
              <FaUserCircle />
            ) : (
              <FaRegUserCircle />
            )}
          </Link>
          <Menu visible={isOpenUserMenu} className={s.sublist}>
            <ul>
              <li>
                <button className={s.sublist__link} onClick={onSignOut}>
                  Sign Out
                </button>
              </li>
            </ul>
          </Menu>
        </li>
      </ul>
    </div>
  );
};
