const pool = require('../db');
const ErrorHandler = require('../utils/ErrorHandler');

//obtener todos los pedidos
const getCartByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM ver_carrito($1);';
    const result = await client.query(query, [user_id]);
    const carrito = result.rows;
    client.release();
    res.status(200).json(carrito);
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

const addProductToCart = async (req, res) => {
  const { usuarioid, productoid, cantidad, personalizacionid } = req.body;

  try {
      // Ejecutar la función SQL para agregar el producto al carrito
      const result = await pool.query(
          'SELECT agregar_producto_a_carrito($1, $2, $3, $4)', 
          [usuarioid, productoid, cantidad, personalizacionid]
      );
      
      res.status(200).json({
          message: 'Producto agregado al carrito exitosamente',
          carrito_id: result.rows[0].carritoid,
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

//eliminar producto de carrito
const deleteProductFromCart = async (req, res) => {
    const { carritoId, productoId } = req.params;
    try {
      const client = await pool.connect();
  
      const eliminarProductoCarritoQuery = 'SELECT * FROM eliminar_producto_carrito($1, $2);';
      await client.query(eliminarProductoCarritoQuery, [carritoId, productoId]);
  
      client.release();
  
      res.status(200).json({ message: 'Producto eliminado del carrito con éxito' });
    } catch (error) {
      ErrorHandler.handleError(error, res);
    }
};

module.exports = {
  getCartByUserId,
  addProductToCart,
  deleteProductFromCart
}