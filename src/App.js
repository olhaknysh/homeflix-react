import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AppBar from './components/AppBar';
import Container from '@material-ui/core/Container';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import routes from './utils/routes';


import { dividerClasses } from '@material-ui/core';

const HomePage = lazy(() =>
    import('./pages/HomePage' /* webpackChunkName: "HomePage */),
);

const LoginPage = lazy(() =>
    import('./pages/LoginPage' /* webpackChunkName: "LoginPage */),
);

const RegisterPage = lazy(() =>
    import('./pages/RegisterPage' /* webpackChunkName: "RegisterPage */),
);

const AccountPage = lazy(() =>
    import('./pages/AccountPage' /* webpackChunkName: "AccountPage */),
);

const FavoritesPage = lazy(() =>
    import('./pages/FavoritesPage' /* webpackChunkName: "FavoritesPage */),
);

const App = () => {
    return (
        <div></div>
    )
}

export default App;
