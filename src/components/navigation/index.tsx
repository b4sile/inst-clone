import React from 'react';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button } from '..';
import { ROUTES } from '../../constants/routes';
import { FirebaseContext } from '../../context/firebase';
import { useAppSelector } from '../../hooks';
import { selectUserUsername } from '../../redux/slices/userSlice';
import { Menu } from '../menu';
import s from './style.module.scss';

export const Navigation = () => {
  const [anchorElem, setAnchorElem] =
    React.useState<HTMLButtonElement | null>(null);
  const { pathname } = useLocation();
  const { firebase } = React.useContext(FirebaseContext);
  const username = useAppSelector(selectUserUsername);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const history = useHistory();

  const onSignOut = async () => {
    try {
      await firebase.auth().signOut();
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
    onClose();
  };

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!anchorElem) setAnchorElem(e.currentTarget);
  };

  const onClose = React.useCallback(() => {
    setAnchorElem(null);
  }, []);

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {username ? (
          <>
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
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleOpenUserMenu}
                className={s.link}
              >
                {pathname === `/${username}` || anchorElem ? (
                  <FaUserCircle />
                ) : (
                  <FaRegUserCircle />
                )}
              </Button>
              <Menu
                anchorElem={anchorElem}
                onClose={onClose}
                visible={Boolean(anchorElem)}
                className={s.sublist}
              >
                <ul>
                  <li>
                    <Link to={`/${username}`}>
                      <Button
                        onClick={onClose}
                        variant="outlined"
                        color="secondary"
                        fullWidth
                      >
                        Profile
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      onClick={onSignOut}
                    >
                      Sign Out
                    </Button>
                  </li>
                  <li>
                    <label>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => fileRef.current?.click()}
                        fullWidth
                      >
                        Add post
                      </Button>
                      <input
                        ref={fileRef}
                        type="file"
                        className={s.input}
                        onChange={onChangeFile}
                      />
                    </label>
                  </li>
                </ul>
              </Menu>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={`${ROUTES.LOGIN}`}>
                <Button>Sign in</Button>
              </Link>
            </li>
            <li>
              <Link to={`${ROUTES.SIGN_UP}`}>
                <Button variant="outlined">Sign up</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
