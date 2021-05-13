import React from 'react';
import s from './style.module.scss';
import { BiSearchAlt2 } from 'react-icons/bi';
import cn from 'classnames';
import { Menu } from '../menu';

export const Search = () => {
  const [isSearching, setIsSearching] = React.useState(false);
  const resultRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsSearching(true);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target !== inputRef.current && e.target !== resultRef.current) {
      setIsSearching(false);
    }
  };

  React.useEffect(() => {
    if (resultRef.current) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

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
      <Menu visible={isSearching} ref={resultRef}>
        Test
      </Menu>
    </div>
  );
};
