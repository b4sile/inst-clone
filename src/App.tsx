import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import s from './App.module.scss';
import { useAuthListener } from './hooks/useAuthListener';

const Login = React.lazy(() => import('./pages/login'));
const SignUp = React.lazy(() => import('./pages/signup'));
const NotFound = React.lazy(() => import('./pages/notFound'));
const Dashboard = React.lazy(() => import('./pages/dashboard'));

function App() {
  const { user } = useAuthListener();

  return (
    <div className={s.container}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={`${ROUTES.DASHBOARD}`} component={Dashboard} exact />
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
