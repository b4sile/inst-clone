import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ROUTES } from './constants/routes';
import s from './App.module.scss';
import { useAuthListener } from './hooks/useAuthListener';
import { Loading } from './pages/loading';
import { useAppSelector } from './hooks';
import { selectUser } from './redux/slices/userSlice';

const Login = React.lazy(() => import('./pages/login'));
const SignUp = React.lazy(() => import('./pages/signup'));
const NotFound = React.lazy(() => import('./pages/notFound'));
const Dashboard = React.lazy(() => import('./pages/dashboard'));

function App() {
  const isLoading = useAuthListener();
  const user = useAppSelector(selectUser);

  return (
    <div className={s.container}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              path={`${ROUTES.DASHBOARD}`}
              render={() =>
                isLoading ? (
                  <Loading />
                ) : user ? (
                  <Dashboard />
                ) : (
                  <Redirect to={`${ROUTES.LOGIN}`} />
                )
              }
              exact
            />
            <Route path={`${ROUTES.LOGIN}`} component={Login} exact />
            <Route path={`${ROUTES.SIGN_UP}`} component={SignUp} exact />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
