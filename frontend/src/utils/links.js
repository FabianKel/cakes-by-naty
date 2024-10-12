let protocol = 'http://';
let host = 'localhost';
const port = ':4000';

const domain = protocol + host + port;

const root = domain;

const links = {
  login: `${root}/users/login`,
  register: `${root}/users/register`,
  pedidos: `${root}/orders`,
  productos: `${root}/products`,
  usuarios: `${root}/users`,
};

export default links;
