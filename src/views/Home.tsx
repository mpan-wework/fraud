import React from 'react';
import { Link } from 'react-router-dom';
import routes, { RouteConfig } from '../router/routes';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.routes}>
        {routes
          .filter((route) => (route as RouteConfig).component)
          .map((route) => {
            const routeConfig: RouteConfig = route as any;
            return (
              <Link key={routeConfig.path} to={routeConfig.path}>
                {routeConfig.path}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
