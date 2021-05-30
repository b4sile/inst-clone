import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import s from './App.module.scss';
import { useAuthListener } from './hooks/useAuthListener';
import { Loading } from './pages/loading';

const Login = React.lazy(() => import('./pages/login'));
const SignUp = React.lazy(() => import('./pages/signup'));
const NotFound = React.lazy(() => import('./pages/notFound'));
const Dashboard = React.lazy(() => import('./pages/dashboard'));

function App() {
  const isLoading = useAuthListener();

  return (
    <div className={s.container}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path={`${ROUTES.LOGIN}`} exact>
              <Login />
            </Route>
            <Route path={`${ROUTES.SIGN_UP}`} exact>
              <SignUp />
            </Route>
            <Route
              exact
              path={[
                `${ROUTES.DASHBOARD}`,
                `${ROUTES.PROFILE}`,
                `${ROUTES.EXPLORE_SUGGESTIONS}`,
                `${ROUTES.POST}`,
                `${ROUTES.CREATE}`,
              ]}
            >
              {isLoading ? <Loading /> : <Dashboard />}
            </Route>
            <Route>{isLoading ? <Loading /> : <NotFound />}</Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
