import React from 'react';
import { Link } from 'react-router-dom';
import routes, { RouteConfig } from '../router/routes';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.routes}>
        {routes
          .filter(
            (route): route is RouteConfig =>
              (route as RouteConfig).component !== undefined &&
              route.path !== '/'
          )
          .map((route) => {
            return (
              <Link key={route.path} to={route.path}>
                {route.path}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
