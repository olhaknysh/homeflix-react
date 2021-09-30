import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './redux/auth/auth-operations';
import { getUserUid } from './redux/auth/auth-selectors';

import AppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import routes from './utils/routes';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "HomePage */)
);

const LoginPage = lazy(() =>
  import('./pages/LoginPage' /* webpackChunkName: "LoginPage */)
);

const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "RegisterPage */)
);

const AccountPage = lazy(() =>
  import('./pages/AccountPage' /* webpackChunkName: "AccountPage */)
);

const FavoritesPage = lazy(() =>
  import('./pages/FavoritesPage' /* webpackChunkName: "FavoritesPage */)
);

const SearchPage = lazy(() =>
  import('./pages/SearchPage' /* webpackChunkName: "SearchPage */)
);

const ShowDetailsPage = lazy(() =>
  import('./pages/ShowDetailsPage' /* webpackChunkName: "ShowDetailsPage */)
);

const App = () => {
  const userUid = useSelector(getUserUid);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('nooo');
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className='container'>
      <AppBar />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route path={routes.showDetails} component={ShowDetailsPage} />
          <PublicRoute
            restricted
            path={routes.register}
            redirectTo={routes.account}
          >
            <RegisterPage />
          </PublicRoute>
          <PublicRoute
            restricted
            redirectTo={routes.account}
            path={routes.login}
          >
            <LoginPage />
          </PublicRoute>
          <PrivateRoute redirectTo={routes.login} path={routes.account}>
            <AccountPage />
          </PrivateRoute>
          <PrivateRoute redirectTo={routes.login} path={routes.favorites}>
            <FavoritesPage />
          </PrivateRoute>
          <PrivateRoute redirectTo={routes.login} path={routes.search}>
            <SearchPage />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
