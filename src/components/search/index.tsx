import React from 'react';
import s from './style.module.scss';
import { BiSearchAlt2 } from 'react-icons/bi';
import { Menu } from '../menu';

export const Search = () => {
  const [anchorElem, setAnchorElem] =
    React.useState<HTMLInputElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setAnchorElem(e.currentTarget);
  };

  const onClose = () => {
    setAnchorElem(null);
  };

  return (
    <div className={s.container}>
      <input
        ref={inputRef}
        className={s.input}
        type="text"
        placeholder="Search"
        onFocus={onFocus}
      />
      <BiSearchAlt2 className={s.search__icon} />
      <Menu
        anchorElem={anchorElem}
        visible={Boolean(anchorElem)}
        onClose={onClose}
        isInputMenu
      >
        <button>click</button>
      </Menu>
    </div>
  );
};
