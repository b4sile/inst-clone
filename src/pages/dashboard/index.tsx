import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Header, Profile } from '../../components';
import { ExploreSuggestions } from '../../components/exploreSuggestions';
import { Home } from '../../components/home';
import { PostModal } from '../../components/post/PostModal';
import { PostWrapper } from '../../components/post/PostWrapper';
import { PrivateRoute } from '../../components/privateRoute';
import { ROUTES } from '../../constants/routes';

const Dashboard = () => {
  const location = useLocation<any>();

  const background = location.state?.background;

  React.useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <>
      <Header />
      <main>
        <Switch location={background || location}>
          <PrivateRoute exact path={`${ROUTES.DASHBOARD}`}>
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path={`${ROUTES.EXPLORE_SUGGESTIONS}`}>
            <ExploreSuggestions />
          </PrivateRoute>
          <Route exact path={`${ROUTES.PROFILE}`}>
            <Profile />
          </Route>
          <Route exact path={`${ROUTES.POST}`}>
            <PostWrapper />
          </Route>
        </Switch>
        {background && (
          <Route exact path={`${ROUTES.POST}`}>
            <PostModal />
          </Route>
        )}
      </main>
    </>
  );
};

export default Dashboard;
