import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { FirebaseContext } from '../../context/firebase';

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute = ({ ...rest }: PrivateRouteProps) => {
  const { firebase } = React.useContext(FirebaseContext);
  const user = firebase.auth().currentUser;

  if (user) {
    return <Route {...rest} />;
  }
  return <Redirect to={`${ROUTES.LOGIN}`} />;
};
