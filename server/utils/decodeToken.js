const jwt = require('jsonwebtoken');

const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);

    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  decodeToken,
};
