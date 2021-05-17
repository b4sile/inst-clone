import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAppSelector } from '../../hooks';
import { selectUser } from '../../redux/slices/userSlice';

interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute = ({ ...rest }: PrivateRouteProps) => {
  const user = useAppSelector(selectUser);

  if (user) {
    return <Route {...rest} />;
  }
  return <Redirect to={`${ROUTES.LOGIN}`} />;
};
