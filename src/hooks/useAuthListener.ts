import {
  selectIsCheckingAuth,
  setIsCheckingAuth,
} from './../redux/slices/userSlice';
import React from 'react';
import { FirebaseContext } from '../context/firebase';
import { useAppDispatch, useAppSelector } from '.';
import { setUser } from '../redux/slices/userSlice';

export const useAuthListener = () => {
  const isCheckingAuth = useAppSelector(selectIsCheckingAuth);
  const dispatch = useAppDispatch();
  const { firebase } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setIsCheckingAuth(false));
      } else {
        dispatch(setIsCheckingAuth(false));
        dispatch(setUser(null));
      }
    });
    return () => listener();
  }, [firebase, dispatch]);

  return isCheckingAuth;
};
