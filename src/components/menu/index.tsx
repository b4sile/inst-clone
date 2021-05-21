import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';

interface MenuProps {
  children: React.ReactNode;
  visible: boolean;
  className?: string;
  onClose: () => void;
  anchorElem: HTMLElement | null;
  isInputMenu?: boolean;
}

export const Menu = ({
  children,
  className,
  visible,
  onClose,
  anchorElem,
  isInputMenu,
}: MenuProps) => {
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (visible && !menuRef.current?.contains(e.target as Node)) {
        if (!isInputMenu) onClose();
        else {
          if (!anchorElem?.contains(e.target as Node)) onClose();
        }
      }
    };
    const handleTab = (e: KeyboardEvent) => {
      if (
        e.key === 'Tab' &&
        visible &&
        document.activeElement !== anchorElem &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (menuRef.current) {
      document.body.addEventListener('click', handleOutsideClick);
      document.body.addEventListener('keyup', handleTab);
    }
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
      document.body.removeEventListener('keyup', handleTab);
    };
  }, [visible, anchorElem, isInputMenu, onClose]);

  return (
    <div
      ref={menuRef}
      className={cn(s.container, className, {
        [s.container_active]: visible,
      })}
    >
      {children}
    </div>
  );
};
