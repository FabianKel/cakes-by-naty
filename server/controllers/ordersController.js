const pool = require('../db');
const ErrorHandler = require('../utils/ErrorHandler');

//obtener todos los pedidos
const getAllOrders = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { mes } = req.query;

    if (authorization) {
      const auth_token = authorization.substring(7);

      const client = await pool.connect();
      let getPedidosQuery = 'SELECT * FROM obtener_pedidos()';
      if (mes) {
        getPedidosQuery = `SELECT * FROM obtener_pedidos_por_mes(${mes});`;
      }
      const result = await client.query(getPedidosQuery);
      const Pedidos = result.rows;
      client.release();
      res.status(200).json({ message: 'Pedidos obtenidos con éxito', Pedidos: Pedidos });
    } else {
      res.status(404).json({ message: 'Ruta no existe.' });
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

const getByStatus = async (req, res) => {
    const { estado } = req.params;
    try {
      const client = await pool.connect();
      const getPedidosQuery = 'SELECT * FROM obtener_pedidos_por_estado($1);';
      const result = await client.query(getPedidosQuery, [estado]);
      const Pedidos = result.rows;
      client.release();
      res.status(200).json({ message: 'Pedidos obtenidos con éxito', Pedidos: Pedidos });
    } catch (error) {
      ErrorHandler.handleError(error, res);
    }
};

//Borrar por ID
const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();

    const deleteOrderQuery = 'SELECT * FROM eliminar_pedido($1);';
    const result = await client.query(deleteOrderQuery, [id]);
    const pedido = result.rows[0];

    client.release();

    if (pedido) {
      res.status(200).json({ message: 'Pedido eliminado con éxito' });
    } else {
      throw { type: 'not_found', message: 'Peido no encontrado' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};


module.exports = {
    getAllOrders,
    getByStatus,
    deleteOrderById
}