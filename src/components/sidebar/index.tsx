import React from 'react';
import cn from 'classnames';

type SidebarProps = { className?: string };

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside className={cn(className)}>
      <div>sidebar</div>
    </aside>
  );
};
