import Home from '../views/Home';
import Google from '../views/Google';

export type RouteConfig = {
  path: string;
  exact?: boolean;
  component: React.FunctionComponent<any>;
};

export type RedirectConfig = {
  path: string;
  redirect: string;
};

type RoutesConfig = Array<RouteConfig | RedirectConfig>;

const routes: RoutesConfig = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/www.google.com',
    exact: true,
    component: Google,
  },
  {
    path: '*',
    redirect: '/',
  },
];

export default routes;
