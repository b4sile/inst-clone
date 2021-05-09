import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import s from './App.module.scss';

const Login = React.lazy(() => import('./pages/login'));

function App() {
  return (
    <div className={s.container}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={`${ROUTES.LOGIN}`} component={Login} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
