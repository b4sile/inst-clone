import { selectIsLoading, setIsLoading } from './../redux/slices/userSlice';
import React from 'react';
import { FirebaseContext } from '../context/firebase';
import { useAppDispatch, useAppSelector } from '.';
import { setUser } from '../redux/slices/userSlice';
import { fetchUserById } from '../redux/thunks';

export const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const { firebase } = React.useContext(FirebaseContext);
  const isLoading = useAppSelector(selectIsLoading);

  React.useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(
      (authUser) => {
        if (authUser) {
          dispatch(fetchUserById(authUser.uid));
        } else {
          dispatch(setUser(null));
          dispatch(setIsLoading(false));
        }
      },
      (error) => {
        console.log(error.message);
        dispatch(setUser(null));
        dispatch(setIsLoading(false));
      }
    );
    return () => listener();
  }, [firebase, dispatch]);

  return isLoading;
};
