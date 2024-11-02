import { clearAuthToken, getAuthToken } from './functions';
import links from './links';

const post = async (link, body) => {
  const token = getAuthToken();

  const dataJSON = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(link, dataJSON);
  const data = await response.json();

  return data;
};

const get = async (link) => {
  const auth_token = getAuthToken();

  const response = await fetch(link, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    },
  });

  return await response.json();
};

export const login = async (username, password) => {
  try {
    const response = await fetch(links.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const user = await response.json();

    if (user) {
      window.localStorage.setItem('auth_token', user.token);
    }

    return user;
  } catch (error) {
    console.log('error: ', error);
  }
};

export const logout = async () => {
  clearAuthToken();

  return true;

  // Invalidar el token en el servidor
};

export const register = async (username, email, password) => {
  try {
    const user = await post(links.register, {
      rol: 'cliente',
      usuario: username,
      correo: email,
      password,
    });

    return user;
  } catch (error) {
    console.log('error: ', error);
  }
};

export const getPedidos = async (estado) => {
  try {
    let status = '';

    if (estado) status = `/estado=${estado}`;

    const pedidos = await get(`${links.pedidos}${status}`);

    return pedidos;
  } catch (error) {
    return [];
  }
};

export const getUsuarioPedidos = async (id) => {
  try {
    let pedidos = await getPedidos();
    pedidos = pedidos.Pedidos.filter((pedido) => pedido.id_usuario === id);

    return pedidos;
  } catch (error) {
    return [];
  }
};

export const getProductos = async () => {
  try {
    const productos = await get(links.productos);

    return productos;
  } catch (error) {
    return [];
  }
};

export const getUsuario = async (id) => {
  try {
    const user = await get(`${links.usuarios}/${id}`);

    return user;
  } catch (e) {
    return null;
  }
};
