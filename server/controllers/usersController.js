const pool = require('../db');
const ErrorHandler = require('../utils/ErrorHandler');

// Controlador para obtener un usuario por ID
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

module.exports = {
  getUserById,
};
