import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { getIsAuthenticated } from '../redux/auth/auth-selectors';

const PublicRoute = ({ children, redirectTo, ...routeProps }) => {
  //   const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    // <Route {...routeProps}>
    //   {isAuthenticated && routeProps.restricted ? (
    //     <Redirect to={redirectTo} />
    //   ) : (
    //     children
    //   )}
    // </Route>
    <div></div>
  );
};

export default PublicRoute;
