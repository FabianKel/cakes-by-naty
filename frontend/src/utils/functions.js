import { decodeToken } from './decodeToken';

export const getCurrentUser = () => {
  const auth_token = getAuthToken();

  const currentUser = decodeToken(auth_token);

  return currentUser;
};

export const getAuthToken = () => {
  const auth_token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  return auth_token;
};

export const clearAuthToken = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('fingerprint');
};
