const pool = require('../db');
const ErrorHandler = require('../utils/ErrorHandler');


// Obtener producto por ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const client = await pool.connect();
      const query = 'SELECT * FROM obtener_producto_por_id($1);';
      const result = await client.query(query, [id]);
      const producto = result.rows[0];
      client.release();
  
      if (producto) {
        res.status(200).json({ message: 'Producto obtenido con éxito', producto });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      ErrorHandler.handleError(error, res);
    }
};

//Eliminar Producto
const deleteProductById = async (req, res) => {
  const { producto_id } = req.params;
  try {
    const client = await pool.connect();
    await client.query('SELECT eliminar_producto($1)', [producto_id]);
    client.release();
    res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};


// Agregar nuevo Producto
const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, categoria_id, ocasion_id, precio, imagen1, imagen2, imagen3, detalles } = req.body;

    const client = await pool.connect();
    // Usar función insertar_producto() y obtener el ProductoID resultante
    const result = await client.query('SELECT insertar_producto($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) AS ProductoID', 
      [nombre, descripcion, categoria_id, ocasion_id, precio, imagen1, imagen2, imagen3, detalles.relleno_id, detalles.masa_id, detalles.sabor_galleta_id, detalles.cobertura_id, detalles.tipo_chocolate_id]
    );
    client.release();

    const productoId = result.rows[0].productoid;

    res.status(200).json({ message: 'Producto creado con éxito', ProductoID: productoId });
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};


//Editar producto
const editProduct = async (req, res) => {
  try {
    const producto_id = parseInt(req.params.producto_id);
    const {
      nombre,
      descripcion,
      categoriaid,
      ocasionid,
      precio,
      imagen1,
      imagen2,
      imagen3,
      rellenoid,
      masaid,
      saborgalletaid,
      coberturatipo,
      tipochocolate,
    } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'No hay datos para actualizar o formato incorrecto' });
    }

    const client = await pool.connect();
    await client.query(
      'SELECT * FROM updateProducto($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
      [
        producto_id,
        nombre,
        descripcion,
        categoriaid,
        ocasionid,
        precio,
        imagen1,
        imagen2,
        imagen3,
        rellenoid,
        masaid,
        saborgalletaid,
        coberturatipo,
        tipochocolate,
      ]
    );

    client.release();

    res.status(200).json({ message: 'Producto actualizado con éxito' });
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};


module.exports = {
  getProductById,
  deleteProductById,
  createProduct,
  editProduct
  };