import React from 'react';
import s from './style.module.scss';
import { BiSearchAlt2 } from 'react-icons/bi';
import { Menu } from '../menu';
import { GrClose } from 'react-icons/gr';
import { useMediaQuery } from 'react-responsive';
import { Button, User } from '..';
import cn from 'classnames';
import { useSearch } from '../../hooks/useSearch';

export const Search = () => {
  const isSmallScreen = useMediaQuery({
    query: '(max-width: 768px)',
  });
  const [anchorElem, setAnchorElem] =
    React.useState<HTMLInputElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const { value, setValue, users, setUsers } = useSearch();

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setAnchorElem(e.currentTarget);
    document.body.style.overflow = 'hidden';
  };

  const onOpenMenu = () => {
    setIsOpenMenu(true);
  };

  const onCloseMenu = () => {
    setIsOpenMenu(false);
  };

  const onClose = () => {
    setAnchorElem(null);
    setIsOpenMenu(false);
    setValue('');
    setUsers([]);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className={cn(s.container, { [s.mobile__input]: isOpenMenu })}>
      {!isSmallScreen || isOpenMenu ? (
        <input
          ref={inputRef}
          className={cn(s.input)}
          type="text"
          placeholder="Search"
          onFocus={onFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <Button
          onClick={onOpenMenu}
          variant="outlined"
          color="secondary"
          className={s.btn}
        >
          <BiSearchAlt2 />
        </Button>
      )}
      {(anchorElem || isOpenMenu) && (
        <GrClose onClick={onCloseMenu} className={s.close} />
      )}
      {!isSmallScreen && <BiSearchAlt2 className={s.search__icon} />}
      <Menu
        anchorElem={anchorElem}
        visible={Boolean(anchorElem)}
        onClose={onClose}
        isInputMenu
        className={cn(s.menu, { [s.mobile__menu]: isSmallScreen })}
      >
        {users.map(({ username, fullName, avatarUrl }) => (
          <User
            key={username}
            username={username}
            fullName={fullName}
            avatarUrl={avatarUrl}
          />
        ))}
      </Menu>
    </div>
  );
};
