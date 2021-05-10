import React from 'react';
import { FirebaseContext } from '../../context/firebase';

export const Header = () => {
  const { firebase } = React.useContext(FirebaseContext);

  const onSignOut = async () => {
    console.log('click');
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={onSignOut}>signout</button>
      <div>header</div>
    </div>
  );
};
