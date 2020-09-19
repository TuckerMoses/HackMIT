import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import Login from './Login';
import Main from './Main';
import Signup from './Signup';
import Home from './Dashboard/Home';
import Profile from './Dashboard/Profile';
import Discover from './Dashboard/Discover';
import ConnectBot from './Dashboard/ConnectBot';

const AppRouter = () => {
  return (
    <Router>
      <AppContainer>
        <Switch>
          <PublicRoute exact path="/" component={Main} />
          <PublicRoute exact path="/signup" component={Signup} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/discover" component={Discover} />
          <PrivateRoute exact path="/connector" component={ConnectBot} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PublicRoute exact={false} path="/" component={Main} />
        </Switch>
      </AppContainer>
    </Router>
  );
};

export default AppRouter;
