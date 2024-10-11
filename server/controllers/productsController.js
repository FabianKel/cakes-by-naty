const pool = require('../db');
const ErrorHandler = require('../utils/ErrorHandler');


// Obtener productos con un límite opcional
const getProducts = async (req, res) => {
  const { limit } = req.params;
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM obtener_productos($1);';
    const result = await client.query(query, [limit || null]);
    const productos = result.rows;
    client.release();

    if (productos.length > 0) {
      res.status(200).json({ message: 'Productos obtenidos con éxito', productos });
    } else {
      throw { type: 'not_found', message: 'No hay productos disponibles' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};


// Obtener productos por categoría con un límite opcional
const getProductsByCategory = async (req, res) => {
  const { categoria_id, limit } = req.params;
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM obtener_producto_por_categoria($1, $2);';
    const result = await client.query(query, [categoria_id, limit || null]);
    const productos = result.rows;
    client.release();

    if (productos.length > 0) {
      res.status(200).json({ message: 'Productos obtenidos con éxito', productos });
    } else {
      throw { type: 'not_found', message: 'Productos no encontrados, intente otra categoría' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

// Obtener productos por ocasión con un límite opcional
const getProductsByOccasion = async (req, res) => {
  const { ocasion_id, limit } = req.params;
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM obtener_producto_por_ocasion($1, $2);';
    const result = await client.query(query, [ocasion_id, limit || null]);
    const productos = result.rows;
    client.release();

    if (productos.length > 0) {
      res.status(200).json({ message: 'Productos obtenidos con éxito', productos });
    } else {
      throw { type: 'not_found', message: 'Productos no encontrados, intente otra ocasión' };
    }
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductsByOccasion,
};