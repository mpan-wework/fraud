import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';

const useRouterPlugins = () => {
  const location = useLocation();

  const routePath = useMemo(() => location.pathname, [location.pathname]);
  const routeChanged = useCallback(
    () => console.debug(`[route changed] ${routePath}`),
    [routePath]
  );

  return {
    values: { routePath },
    callbacks: { routeChanged },
  };
};

export default useRouterPlugins;
