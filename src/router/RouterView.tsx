import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import useRouterPlugins from './useRouterPlugins';
import routes, { RedirectConfig, RouteConfig } from './routes';

const RouterView = () => {
  const {
    values: { routePath },
    callbacks: { routeChanged },
  } = useRouterPlugins();

  useEffect(routeChanged, [routePath]);

  return (
    <Switch>
      {routes.map((route) => {
        if ((route as RedirectConfig).redirect) {
          const redirectConfig = route as RedirectConfig;
          return (
            <Redirect
              key={redirectConfig.path}
              to={redirectConfig.redirect}
              from={redirectConfig.path}
            />
          );
        }

        const routeConfig = route as RouteConfig;
        return (
          <Route
            key={routeConfig.path}
            path={routeConfig.path}
            exact={!!routeConfig.exact}
            render={(routeProps) => <routeConfig.component {...routeProps} />}
          />
        );
      })}
    </Switch>
  );
};

export default RouterView;
