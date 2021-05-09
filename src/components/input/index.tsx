import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputText = ({
  placeholder,
  className,
  onChange,
  value,
  ...restProps
}: InputProps) => {
  return (
    <div className={cn(s.container, className)}>
      <label className={cn(s.label, { [s.label_active]: value !== '' })}>
        <input
          className={s.input}
          type="text"
          value={value}
          onChange={onChange}
          {...restProps}
        />
        {placeholder && <span className={s.placeholder}>{placeholder}</span>}
      </label>
    </div>
  );
};
