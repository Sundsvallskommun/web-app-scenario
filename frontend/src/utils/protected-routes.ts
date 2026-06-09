const publicRoutes = new Set(['/', '/login', '/logout']);

export const normalizeRoutePath = (pathname: string) => pathname.replace(/^\/sv(?=\/|$)/, '') || '/';

export const isProtectedRoute = (pathname?: string | null) => {
  const normalizedPath = normalizeRoutePath(pathname || '/');

  if (publicRoutes.has(normalizedPath)) {
    return false;
  }

  if (normalizedPath === '/start') {
    return true;
  }

  return /^\/\d+(?:\/\d+)?$/.test(normalizedPath);
};
