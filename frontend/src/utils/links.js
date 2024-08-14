let protocol = 'http://';
let host = 'localhost';
const port = ':4000';

const domain = protocol + host + port;

const root = domain;

const links = {
  login: `${root}/login`,
  register: `${root}/register`,
  pedidos: `${root}/pedidos`,
  productos: `${root}/productos`,
};

export default links;
