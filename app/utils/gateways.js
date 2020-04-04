const isDev = () =>
  (typeof window !== 'undefined' && window?.location?.host === 'localhost') ||
  process?.env?.NODE_ENV === 'development';

export const getGatewayUsersMe = () =>
  isDev() ? 'http://localhost:3000/users/me' : 'http://hopl.se:3000/users/me';

export const getGatewayUsers = () =>
  isDev() ? 'http://localhost:3000/users' : 'http://hopl.se:3000/users';

export const getGatewayUsersLogin = () =>
  isDev()
    ? 'http://localhost:3000/users/login'
    : 'http://hopl.se:3000/users/login';
