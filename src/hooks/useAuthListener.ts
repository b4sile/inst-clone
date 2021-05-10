import React from 'react';
import { FirebaseContext } from '../context/firebase';
import { useAppDispatch, useAppSelector } from '.';
import { selectUser, setUser } from '../redux/slices/userSlice';

export const useAuthListener = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { firebase } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        dispatch(setUser(authUser));
      } else {
        localStorage.removeItem('authUser');
        dispatch(setUser(null));
      }
    });
    return () => listener();
  }, [firebase, dispatch]);

  return { user };
};
