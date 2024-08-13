import jwt from 'jsonwebtoken';

export const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
