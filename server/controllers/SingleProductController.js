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
        throw { type: 'not_found', message: 'Producto no encontrado' };
      }
    } catch (error) {
      ErrorHandler.handleError(error, res);
    }
};

// Agregar nuevo Producto
const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, categoria_id, ocasion_id, precio, imagen1, imagen2, imagen3, detalles } = req.body;

    // Validar campos obligatorios
    if (!nombre || !precio || !categoria_id) {
      return res.status(400).json({ error: 'Bad Request: Faltan datos o formato incorrecto' });
    }

    // Insertar el producto en la tabla Productos
    const insertProductQuery = `
      INSERT INTO Productos (Nombre, Descripcion, CategoriaID, OcasionID, Precio, Imagen1, Imagen2, Imagen3)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING ProductoID;
    `;
    const result = await pool.query(insertProductQuery, [
      nombre,
      descripcion,
      categoria_id,
      ocasion_id,
      precio,
      imagen1 || null,
      imagen2 || null,
      imagen3 || null,
    ]);

    const productoId = result.rows[0].productoid;

    // Insertar detalles del producto si existen
    if (detalles) {
      const insertDetailsQuery = `
        INSERT INTO Detalles_Producto (ProductoID, RellenoID, MasaID, Sabor_GalletaID, CoberturaID, Tipo_ChocolateID)
        VALUES ($1, $2, $3, $4, $5, $6);
      `;
      await pool.query(insertDetailsQuery, [
        productoId,
        detalles.relleno_id || null,
        detalles.masa_id || null,
        detalles.sabor_galleta_id || null,
        detalles.cobertura_id || null,
        detalles.tipo_chocolate_id || null,
      ]);
    }

    res.status(201).json({ message: 'Producto creado con éxito', ProductoID: productoId });
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
    createProduct,
    editProduct
  };