import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Profile } from '../../components';
import { PrivateRoute } from '../../components/privateRoute';
import { ROUTES } from '../../constants/routes';

const Home = React.lazy(() => import('../../components/home'));

const Dashboard = () => {
  React.useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <>
      <Header />
      <main>
        <Switch>
          <PrivateRoute exact path={`${ROUTES.DASHBOARD}`} component={Home} />
          <Route exact path={`${ROUTES.PROFILE}`} component={Profile} />
        </Switch>
      </main>
    </>
  );
};

export default Dashboard;
