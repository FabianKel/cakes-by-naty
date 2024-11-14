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
  producto: `${root}/product`,
  usuarios: `${root}/users`,
  carts: `${root}/carts`,
  address: {
    add: (num) => `${root}/address/add/${num}`,  
    edit: (id) => `${root}/address/edit/${id}`,        
    delete: (id) => `${root}/address/delete/${id}`     
  }
};


export default links;
