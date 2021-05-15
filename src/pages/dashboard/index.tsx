import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Home, Profile } from '../../components';
import { ROUTES } from '../../constants/routes';

const Dashboard = () => {
  React.useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route exact path={`${ROUTES.DASHBOARD}`} component={Home} />
          <Route exact path={`${ROUTES.PROFILE}`} component={Profile} />
        </Switch>
      </main>
    </>
  );
};

export default Dashboard;
