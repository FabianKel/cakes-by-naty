const pool = require('../db');
const ErrorHandler = require('../utils/ErrorHandler');
const { decodeToken } = require('../utils/decodeToken');

//todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const client = await pool.connect();

    const result = await client.query('SELECT * FROM Usuarios;');
    const usuarios = result.rows;

    client.release();

    res.status(200).json({ message: 'Usuarios obtenidos con éxito', usuarios: usuarios });
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

//obtener usuario por ID
const getUserById = async (req, res) => {
  const { u_id } = req.params;
  try {
    const client = await pool.connect();
    const getUserByID = 'SELECT * FROM obtener_usuario_por_id($1);';
    const result = await client.query(getUserByID, [u_id]);
    const usuario = result.rows[0];
    client.release();

    if (usuario) {
      return res.status(200).json({ message: 'Usuario obtenido con éxito', usuario });
    } else {
      throw { type: 'not_found', message: 'Usuario no encontrado' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

//Registrar
const register = async (req, res) => {
  const { usuario, correo, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM register($1, $2, $3)', [
      usuario,
      correo,
      password,
    ]);
    client.release();

    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      throw { type: 'database', message: 'Error registering user' };
    }
  } catch (err) {
    ErrorHandler.handleError(err, res);
  }
};

//Login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM login($1, $2)', [username, password]);
    client.release();
    if (result.rows.length > 0) {
      res.status(201).json(result.rows[0]);
    } else {
      throw { type: 'database', message: 'Error logging in user' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

const editUser = async (req, res) => {
  try {
    const usuario_id = parseInt(req.params.u_id);
    const { authorization } = req.headers;

    if (authorization) {
      const auth_token = authorization.substring(7);
      const isValidToken = decodeToken(auth_token);

      if (isValidToken) {
        const {
          UsuarioID = usuario_id,
          rol = null,
          nickname = null,
          primer_nombre = null,
          segundo_nombre = null,
          correo = null,
          telefono = null,
          password = null,
          direccion1 = null,
          direccion2 = null,
          direccion3 = null,
        } = req.body;

        const client = await pool.connect();
        await client.query(
          'SELECT * FROM update_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
          [
            UsuarioID,
            rol,
            nickname,
            primer_nombre,
            segundo_nombre,
            correo,
            telefono,
            password,
            direccion1,
            direccion2,
            direccion3,
          ]
        );

        client.release();
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
      } else {
        res.status(401).json({ message: 'Token inválido' });
      }
    } else {
      res.status(401).json({ message: 'Autenticación requerida' });
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};


module.exports = {
  getUserById, getAllUsers, register, login, editUser
};
