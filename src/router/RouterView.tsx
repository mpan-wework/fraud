import React, { useEffect, useMemo } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import useRouterPlugins from './useRouterPlugins';
import routeList, { RedirectConfig, RouteConfig } from './routes';

const RouterView = () => {
  const {
    values: { routePath },
    callbacks: { routeChanged },
  } = useRouterPlugins();

  useEffect(routeChanged, [routePath]);

  const routes = useMemo(
    () =>
      routeList.filter(
        (route): route is RouteConfig =>
          (route as RouteConfig).component !== undefined
      ),
    []
  );
  const redirects = useMemo(
    () =>
      routeList.filter(
        (route): route is RedirectConfig =>
          (route as RedirectConfig).redirect !== undefined
      ),
    []
  );

  return (
    <Switch>
      {routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            exact={!!route.exact}
            render={(routeProps) => <route.component {...routeProps} />}
          />
        );
      })}
      {redirects.map((redirect) => (
        <Redirect
          key={redirect.path}
          to={redirect.redirect}
          from={redirect.path}
        />
      ))}
    </Switch>
  );
};

export default RouterView;
