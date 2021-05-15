import React from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { selectUser } from '../redux/slices/userSlice';
import { FirebaseContext } from '../context/firebase';
import { fetchUserById } from '../redux/thunks';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { firebase } = React.useContext(FirebaseContext);
  const uid = firebase.auth().currentUser?.uid;

  React.useEffect(() => {
    if (uid) {
      dispatch(fetchUserById(uid));
    }
  }, [uid, dispatch]);

  return { user, isAuth: Boolean(uid) };
};
