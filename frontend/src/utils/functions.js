import { decodeToken } from './decodeToken';

export const getCurrentUser = () => {
  const auth_token = getAuthToken();

  const currentUser = decodeToken(auth_token);

  return currentUser;
};

export const getAuthToken = () => {
  const auth_token = typeof window !== 'undefined' ? sessionStorage.getItem('auth_token') : null;

  return auth_token;
};

export const clearAuthToken = () => {
  sessionStorage.removeItem('auth_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem('fingerprint');
};
