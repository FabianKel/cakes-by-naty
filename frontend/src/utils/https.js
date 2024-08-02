import links from './links';

const post = async (link, body) => {
  const token = window.sessionStorage.getItem('auth_token');

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

export const login = async (username, password) => {
  try {
    const user = await post(links.login, {
      username,
      password,
    });

    if (user) {
      window.sessionStorage.setItem('auth_token', user.token);
    }

    return user;
  } catch (error) {
    console.log('error: ', error);
  }
};

export const register = async (username, email, password, rol = 'cliente') => {
  try {
    const user = await post(links.register, {
      usuario: username,
      rol,
      correo: email,
      password,
    });

    return user;
  } catch (error) {
    console.log('error: ', error);
  }
};
