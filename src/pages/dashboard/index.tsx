import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Profile } from '../../components';
import { ExploreSuggestions } from '../../components/exploreSuggestions';
import { Home } from '../../components/home';
import { PostWrapper } from '../../components/post/PostWrapper';
import { PrivateRoute } from '../../components/privateRoute';
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
          <PrivateRoute exact path={`${ROUTES.DASHBOARD}`} component={Home} />
          <PrivateRoute
            exact
            path={`${ROUTES.EXPLORE_SUGGESTIONS}`}
            component={ExploreSuggestions}
          />
          <Route exact path={`${ROUTES.PROFILE}`} component={Profile} />
          <Route exact path={`${ROUTES.POST}`} component={PostWrapper} />
        </Switch>
      </main>
    </>
  );
};

export default Dashboard;
