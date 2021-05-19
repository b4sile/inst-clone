import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Profile, Suggestions } from '../../components';
import { ExploreSuggestions } from '../../components/exploreSuggestions';
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
          <PrivateRoute
            exact
            path={`${ROUTES.EXPLORE_SUGGESTIONS}`}
            component={ExploreSuggestions}
          />
          <Route exact path={`${ROUTES.PROFILE}`} component={Profile} />
        </Switch>
      </main>
    </>
  );
};

export default Dashboard;
