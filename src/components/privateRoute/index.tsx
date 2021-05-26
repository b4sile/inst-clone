import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAppSelector } from '../../hooks';
import { selectUserUsername } from '../../redux/slices/userSlice';

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const username = useAppSelector(selectUserUsername);

  if (username) {
    return <Route {...rest}>{children}</Route>;
  }
  return <Redirect to={`${ROUTES.LOGIN}`} />;
};
