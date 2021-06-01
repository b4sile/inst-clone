import React from 'react';
import { useAppDispatch } from '.';
import { UserDataInterface } from '../redux/slices/userSlice';
import { fetchSearchUsers } from '../redux/thunks';

export const useSearch = () => {
  const [value, setValue] = React.useState('');
  const [users, setUsers] = React.useState<UserDataInterface[]>([]);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (value === '') return;
    const timer = setTimeout(async () => {
      const response = await dispatch(fetchSearchUsers(value));
      if (response.meta.requestStatus === 'fulfilled')
        setUsers(response.payload as UserDataInterface[]);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [value, dispatch]);

  return { value, setValue, users, setUsers };
};
