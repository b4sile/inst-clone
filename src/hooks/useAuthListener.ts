import React from 'react';
import { FirebaseContext } from '../context/firebase';
import { useAppDispatch, useAppSelector } from '.';
import { selectUserIsLoading, setUser } from '../redux/slices/userSlice';

export const useAuthListener = () => {
  const isLoading = useAppSelector(selectUserIsLoading);
  const dispatch = useAppDispatch();
  const { firebase } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser({ user: authUser, isLoading: false }));
      } else {
        dispatch(setUser({ user: null, isLoading: false }));
      }
    });
    return () => listener();
  }, [firebase, dispatch]);

  return isLoading;
};
