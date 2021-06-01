import React from 'react';
import s from './style.module.scss';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { CgAddR } from 'react-icons/cg';
import { GrLogout } from 'react-icons/gr';
import { AiOutlineLogin } from 'react-icons/ai';
import { ROUTES } from '../../constants/routes';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button } from '..';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserUsername } from '../../redux/slices/userSlice';
import { FirebaseContext } from '../../context/firebase';

export const MobileNav = () => {
  const { pathname } = useLocation();
  const username = useAppSelector(selectUserUsername);
  const { firebase } = React.useContext(FirebaseContext);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onSignOut = async () => {
    try {
      await firebase.auth().signOut();
      dispatch({ type: 'user/logout' });
      history.push(ROUTES.LOGIN);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files && e.target.files[0];
    if (file) {
      history.push({ pathname: `${ROUTES.CREATE}`, state: { file } });
      e.target.value = '';
    }
  };

  return (
    <div className={s.mobile__container}>
      <ul className={s.mobile__list}>
        {username ? (
          <>
            <li className={s.mobile__item}>
              <Link to={`${ROUTES.DASHBOARD}`} className={s.mobile__link}>
                <Button variant="outlined" color="secondary">
                  {pathname === ROUTES.DASHBOARD ? (
                    <AiFillHome />
                  ) : (
                    <AiOutlineHome />
                  )}
                </Button>
              </Link>
            </li>
            <li className={s.mobile__item}>
              <label className={s.mobile__link}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => fileRef.current?.click()}
                >
                  <CgAddR />
                </Button>
                <input
                  ref={fileRef}
                  type="file"
                  className={s.input}
                  onChange={onChangeFile}
                  accept="image/*"
                />
              </label>
            </li>
            <li className={s.mobile__item}>
              <Link
                to={`${ROUTES.EXPLORE_SUGGESTIONS}`}
                className={s.mobile__link}
              >
                <Button variant="outlined" color="secondary">
                  {pathname === ROUTES.EXPLORE_SUGGESTIONS ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </Button>
              </Link>
            </li>
            <li className={s.mobile__item}>
              <Link to={`/${username}`} className={s.mobile__link}>
                <Button variant="outlined" color="secondary">
                  {pathname === `/${username}` ? (
                    <FaUserCircle />
                  ) : (
                    <FaRegUserCircle />
                  )}
                </Button>
              </Link>
            </li>
            <li className={s.mobile__item}>
              <Button
                variant="outlined"
                color="secondary"
                className={s.mobile__link}
              >
                <GrLogout onClick={onSignOut} />
              </Button>
            </li>
          </>
        ) : (
          <li className={s.mobile__item}>
            <Link to={`${ROUTES.LOGIN}`} className={s.mobile__link}>
              <Button variant="outlined" color="secondary">
                <AiOutlineLogin />
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
